import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Card } from '@/components/ui'
import { CONTACT_ENTRIES } from '@/lib/content/mock/contactEntries'

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
  const tMeta = await getTranslations({ locale, namespace: 'pages.contact' })
  return buildBaseMetadata(locale, { path: '/contact', title: tMeta('breadcrumb') })
}

export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.contact')

  return (
    <Section
      eyebrow="CONTACT"
      title={t('breadcrumb')}
      subtitle={t('intro')}
      background="subtle"
      containerSize="lg"
    >
      <Container size="lg" className="px-0">
        <Breadcrumb
          className="mb-10"
          items={[{ label: t('breadcrumb'), href: '/' }, { label: t('breadcrumb') }]}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {CONTACT_ENTRIES.map((entry) => (
            <Link key={entry.id} href={entry.href} className="block">
              <Card hoverable padding="lg" className="flex h-full flex-col">
                <span
                  aria-hidden="true"
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-2xl text-primary-700"
                >
                  {entry.icon}
                </span>
                <h2 className="text-xl font-bold text-neutral-900">
                  {t(`entries.${entry.id}.title`)}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                  {t(`entries.${entry.id}.desc`)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-500">
                  {t('open')} <span aria-hidden="true">→</span>
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500">{t('phoneNote')}</p>
      </Container>
    </Section>
  )
}
