import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Heading, Card, Button, OptimizedImage } from '@/components/ui'
import { FACTORY_SITES, getFactoryDetail } from '@/lib/content/mock/factory'

type Params = { locale: string; site: string }

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => FACTORY_SITES.map((site) => ({ locale, site })))
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale, site } = await params
  if (!isLocale(locale) || !getFactoryDetail(site)) return {}
  const t = await getTranslations({ locale, namespace: 'pages.factory' })
  return buildBaseMetadata(locale, { path: `/factory/${site}`, title: t(`items.${site}.name`) })
}

export default async function FactorySitePage({ params }: { params: Promise<Params> }) {
  const { locale, site } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const detail = getFactoryDetail(site)
  if (!detail) notFound()

  const t = await getTranslations('pages.factory')
  const m = await getTranslations('pages.factory.metrics')
  const eq = await getTranslations('pages.factory.equipment')
  const d = await getTranslations('pages.factory.detail')
  const s = await getTranslations(`pages.factory.sites.${site}`)

  return (
    <Section background="subtle" containerSize="lg" spacing="normal">
      <Container size="lg" className="px-0">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: t('breadcrumb'), href: '/' },
            { label: t('breadcrumb'), href: '/factory' },
            { label: t(`items.${site}.name`) }
          ]}
        />

        <h1 className="heading-section mb-3">{t(`items.${site}.name`)}</h1>
        <p className="mb-8 text-neutral-500">{t(`items.${site}.subtitle`)}</p>

        <OptimizedImage
          src={detail.image}
          alt={t(`items.${site}.name`)}
          width={1200}
          height={800}
          aspect="3:2"
          rounded
          priority
          sizes="(min-width: 1024px) 880px, 100vw"
        />

        <p className="mt-10 text-body text-neutral-700">{s('overview')}</p>

        {/* 关键数字 */}
        <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {detail.metrics.map((metric) => (
            <div key={metric.labelKey} className="rounded border border-neutral-200 bg-neutral-0 p-3">
              <dt className="text-2xs uppercase text-neutral-400 tracking-[0.1em]">{m(metric.labelKey)}</dt>
              <dd className="mt-1 font-en-sans text-xl font-bold text-primary-700 tabular-nums">{metric.value}</dd>
            </div>
          ))}
        </dl>

        {/* 設備リスト */}
        <Heading level={2} size="sub" className="mt-12 mb-6">{d('equipmentTitle')}</Heading>
        {detail.equipment.length > 0 ? (
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {detail.equipment.map((e) => (
              <div key={e.labelKey} className="rounded border border-neutral-200 bg-neutral-0 p-3 text-center">
                <dd className="font-en-sans text-2xl font-bold text-primary-700 tabular-nums">{e.value}</dd>
                <dt className="mt-1 text-xs text-neutral-500">{eq(e.labelKey)}</dt>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-neutral-500">{d('equipmentTbd')}</p>
        )}

        {/* 得意とする受注 */}
        <Heading level={2} size="sub" className="mt-12 mb-6">{d('capabilitiesTitle')}</Heading>
        <ul className="space-y-2">
          {detail.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2 text-body text-neutral-700">
              <span aria-hidden="true" className="mt-1 text-primary-500">✓</span>
              {s(`capabilities.${cap}`)}
            </li>
          ))}
        </ul>

        {/* 受注規模 */}
        <Heading level={2} size="sub" className="mt-12 mb-4">{d('orderScaleTitle')}</Heading>
        <p className="text-body text-neutral-700">{s('orderScale')}</p>

        {/* 物流（缅甸）/ 交通（青岛） */}
        {detail.hasLogistics ? (
          <>
            <Heading level={2} size="sub" className="mt-12 mb-4">{d('logisticsTitle')}</Heading>
            <p className="text-body text-neutral-700">{s('logistics')}</p>
          </>
        ) : null}
        {detail.hasAccess ? (
          <>
            <Heading level={2} size="sub" className="mt-12 mb-4">{d('accessTitle')}</Heading>
            <p className="text-body text-neutral-700">{s('access')}</p>
          </>
        ) : null}

        {/* 動画位（XXX 占位） */}
        <Heading level={2} size="sub" className="mt-12 mb-4">{d('videoTitle')}</Heading>
        <div className="flex aspect-video items-center justify-center rounded border border-dashed border-neutral-300 bg-neutral-100 text-sm text-neutral-400">
          {d('videoPlaceholder')}
        </div>

        {/* 见学 CTA + 缅甸签证提示 */}
        <Card padding="lg" className="mt-12 bg-neutral-0 text-center">
          {detail.hasVisaNote ? (
            <p className="mb-4 text-sm text-neutral-600">{s('visaNote')}</p>
          ) : null}
          <Link href="/contact/visit" className="inline-block">
            <Button variant="primary" size="md" type="button">{d('visitCta')}</Button>
          </Link>
        </Card>
      </Container>
    </Section>
  )
}
