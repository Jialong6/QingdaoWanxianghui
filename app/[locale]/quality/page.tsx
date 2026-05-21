import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Heading, Card, Badge, Button } from '@/components/ui'
import { StepTimeline } from '@/components/sections'
import { INSPECTION_STEPS, QC_METHODS, XRAY_UNITS, CERTIFICATIONS } from '@/lib/content/mock/quality'

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
  const tMeta = await getTranslations({ locale, namespace: 'pages.quality' })
  return buildBaseMetadata(locale, { path: '/quality', title: tMeta('title') })
}

export default async function QualityPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.quality')

  return (
    <Section eyebrow="QUALITY" title={t('title')} subtitle={t('intro')} background="subtle" containerSize="lg">
      <Container size="lg" className="px-0">
        <Breadcrumb className="mb-8" items={[{ label: t('title'), href: '/' }, { label: t('breadcrumb') }]} />

        <p className="mb-12 text-body text-neutral-700">{t('overview')}</p>

        <Heading level={2} size="sub" className="mb-6">{t('stepsTitle')}</Heading>
        <StepTimeline
          className="mb-16"
          steps={INSPECTION_STEPS.map((id) => ({ label: t(`steps.${id}.label`), body: t(`steps.${id}.body`) }))}
        />

        <Heading level={2} size="sub" className="mb-6">{t('xrayTitle')}</Heading>
        <div className="mb-4 grid grid-cols-2 gap-4">
          {(['china', 'myanmar'] as const).map((k) => (
            <Card key={k} padding="lg" className="text-center">
              <p className="font-en-sans text-4xl font-bold text-primary-500 tabular-nums">{XRAY_UNITS[k]}</p>
              <p className="mt-2 text-sm text-neutral-600">{t(`xray.${k}`)}</p>
            </Card>
          ))}
        </div>
        <p className="mb-16 text-sm text-neutral-600">{t('xrayBody')}</p>

        <Heading level={2} size="sub" className="mb-6">{t('methodsTitle')}</Heading>
        <ul className="mb-16 grid gap-3 sm:grid-cols-3">
          {QC_METHODS.map((m) => (
            <li key={m} className="rounded border border-neutral-200 bg-neutral-0 px-4 py-3 text-sm text-neutral-700">
              {t(`methods.${m}`)}
            </li>
          ))}
        </ul>

        <Heading level={2} size="sub" className="mb-6">{t('certTitle')}</Heading>
        <div className="mb-3 flex flex-wrap gap-2">
          {CERTIFICATIONS.map((c) => (
            <Badge key={c} variant="primary">{c.toUpperCase()}</Badge>
          ))}
        </div>
        <p className="mb-16 text-sm text-neutral-500">{t('certNote')}</p>

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
