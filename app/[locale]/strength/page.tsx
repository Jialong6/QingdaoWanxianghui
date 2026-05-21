import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Section, Container, Breadcrumb, Card } from '@/components/ui'
import { STRENGTHS } from '@/lib/content/mock/strengths'

type Params = { locale: string }

export function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'en' }, { locale: 'zh' }]
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const tMeta = await getTranslations({ locale, namespace: 'home.strengths' })
  return buildBaseMetadata(locale, { path: '/strength', title: tMeta('title') })
}

export default async function StrengthPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.strength')
  const ts = await getTranslations('home.strengths')

  return (
    <Section
      eyebrow="OUR STRENGTHS"
      title={ts('title')}
      subtitle={t('intro')}
      background="subtle"
      containerSize="xl"
    >
      <Container size="xl" className="px-0">
        <Breadcrumb
          className="mb-10"
          items={[
            { label: ts('title'), href: '/' },
            { label: t('breadcrumb') }
          ]}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STRENGTHS.map((s, idx) => (
            <Card key={s.id} padding="lg" className="flex flex-col">
              <span
                aria-hidden="true"
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-2xl text-primary-700"
              >
                {s.icon}
              </span>
              <p className="font-en-sans text-2xs font-medium uppercase text-neutral-400 tracking-[0.2em]">
                0{idx + 1}
              </p>
              <h2 className="mt-1 text-xl font-bold text-neutral-900">
                {ts(`items.${s.id}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {ts(`items.${s.id}.desc`)}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
