import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Heading, Card, Button } from '@/components/ui'
import { TRADE_TERMS, PAYMENT_TERMS } from '@/lib/content/mock/commercial'

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
  const tMeta = await getTranslations({ locale, namespace: 'pages.commercial' })
  return buildBaseMetadata(locale, { path: '/commercial', title: tMeta('title') })
}

export default async function CommercialPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.commercial')

  return (
    <Section eyebrow="TERMS" title={t('title')} subtitle={t('intro')} background="subtle" containerSize="lg">
      <Container size="lg" className="px-0">
        <Breadcrumb className="mb-8" items={[{ label: t('title'), href: '/' }, { label: t('breadcrumb') }]} />

        <Heading level={2} size="sub" className="mb-6">{t('tradeTitle')}</Heading>
        <div className="mb-16 grid gap-4 md:grid-cols-3">
          {TRADE_TERMS.map((id) => (
            <Card key={id} padding="lg">
              <h3 className="text-base font-bold text-neutral-900">{t(`trade.${id}.label`)}</h3>
              <p className="mt-2 text-sm text-neutral-600">{t(`trade.${id}.body`)}</p>
            </Card>
          ))}
        </div>

        <Heading level={2} size="sub" className="mb-6">{t('paymentTitle')}</Heading>
        <div className="mb-16 grid gap-4 md:grid-cols-3">
          {PAYMENT_TERMS.map((id) => (
            <Card key={id} padding="lg">
              <h3 className="text-base font-bold text-neutral-900">{t(`payment.${id}.label`)}</h3>
              <p className="mt-2 text-sm text-neutral-600">{t(`payment.${id}.body`)}</p>
            </Card>
          ))}
        </div>

        <Heading level={2} size="sub" className="mb-4">{t('moqTitle')}</Heading>
        <p className="mb-16 text-body text-neutral-700">{t('moqBody')}</p>

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
