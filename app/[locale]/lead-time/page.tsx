import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Heading, Card, Button } from '@/components/ui'
import { StepTimeline } from '@/components/sections'
import { LEAD_PHASES, LEAD_VARIABLES } from '@/lib/content/mock/leadTime'

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
  const tMeta = await getTranslations({ locale, namespace: 'pages.leadTime' })
  return buildBaseMetadata(locale, { path: '/lead-time', title: tMeta('title') })
}

export default async function LeadTimePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.leadTime')

  return (
    <Section eyebrow="LEAD TIME" title={t('title')} subtitle={t('intro')} background="subtle" containerSize="lg">
      <Container size="lg" className="px-0">
        <Breadcrumb className="mb-8" items={[{ label: t('title'), href: '/' }, { label: t('breadcrumb') }]} />

        <p className="mb-12 text-body text-neutral-700">{t('overview')}</p>

        <Heading level={2} size="sub" className="mb-6">{t('phasesTitle')}</Heading>
        <StepTimeline
          className="mb-6"
          steps={LEAD_PHASES.map((id) => ({
            label: t(`phases.${id}.label`),
            meta: t(`phases.${id}.duration`),
            body: t(`phases.${id}.body`)
          }))}
        />
        <p className="mb-16 rounded border-l-4 border-primary-500 bg-primary-50 px-4 py-3 text-sm font-medium text-primary-900">
          {t('totalNote')}
        </p>

        <Heading level={2} size="sub" className="mb-4">{t('rushTitle')}</Heading>
        <p className="mb-16 text-body text-neutral-700">{t('rushBody')}</p>

        <Heading level={2} size="sub" className="mb-6">{t('variablesTitle')}</Heading>
        <ul className="mb-6 space-y-3">
          {LEAD_VARIABLES.map((v) => (
            <li key={v} className="rounded border border-neutral-200 bg-neutral-0 px-4 py-3 text-sm text-neutral-700">
              {t(`variables.${v}`)}
            </li>
          ))}
        </ul>
        <p className="mb-16 text-sm text-neutral-500">{t('routeNote')}</p>

        <Card padding="lg" className="bg-neutral-0 text-center">
          <h3 className="text-xl font-bold text-neutral-900">{t('ctaTitle')}</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">{t('ctaText')}</p>
          <div className="mt-6">
            <Link href="/contact/inquiry" className="inline-block">
              <Button variant="primary" size="md" type="button">{t('ctaButton')}</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </Section>
  )
}
