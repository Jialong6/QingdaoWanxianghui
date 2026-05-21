import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Heading, Card, Button } from '@/components/ui'
import { StepTimeline } from '@/components/sections'
import { SAMPLING_STEPS, SAMPLING_NOTES } from '@/lib/content/mock/sampling'

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
  const tMeta = await getTranslations({ locale, namespace: 'pages.sampling' })
  return buildBaseMetadata(locale, { path: '/sampling', title: tMeta('title') })
}

export default async function SamplingPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.sampling')

  return (
    <Section eyebrow="SAMPLING" title={t('title')} subtitle={t('intro')} background="subtle" containerSize="lg">
      <Container size="lg" className="px-0">
        <Breadcrumb className="mb-8" items={[{ label: t('title'), href: '/' }, { label: t('breadcrumb') }]} />

        <Heading level={2} size="sub" className="mb-6">{t('stepsTitle')}</Heading>
        <StepTimeline
          className="mb-16"
          steps={SAMPLING_STEPS.map((id) => ({
            label: t(`steps.${id}.label`),
            meta: t(`steps.${id}.meta`),
            body: t(`steps.${id}.body`)
          }))}
        />

        <Heading level={2} size="sub" className="mb-6">{t('notesTitle')}</Heading>
        <ul className="mb-16 space-y-3">
          {SAMPLING_NOTES.map((n) => (
            <li key={n} className="rounded border border-neutral-200 bg-neutral-0 px-4 py-3 text-sm text-neutral-700">
              {t(`notes.${n}`)}
            </li>
          ))}
        </ul>

        <Card padding="lg" className="bg-neutral-0 text-center">
          <h3 className="text-xl font-bold text-neutral-900">{t('ctaTitle')}</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">{t('ctaText')}</p>
          <div className="mt-6">
            <Link href="/contact/sample" className="inline-block">
              <Button variant="primary" size="md" type="button">{t('ctaButton')}</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </Section>
  )
}
