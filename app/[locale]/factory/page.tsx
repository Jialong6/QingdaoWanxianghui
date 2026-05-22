import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Card, OptimizedImage } from '@/components/ui'
import { FACTORY_SITES, FACTORY_DETAILS } from '@/lib/content/mock/factory'

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
  const tMeta = await getTranslations({ locale, namespace: 'pages.factory' })
  return buildBaseMetadata(locale, { path: '/factory', title: tMeta('breadcrumb') })
}

export default async function FactoryHubPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.factory')
  const m = await getTranslations('pages.factory.metrics')

  return (
    <Section eyebrow="FACTORIES" title={t('breadcrumb')} subtitle={t('intro')} background="subtle" containerSize="xl">
      <Container size="xl" className="px-0">
        <Breadcrumb className="mb-10" items={[{ label: t('breadcrumb'), href: '/' }, { label: t('breadcrumb') }]} />

        <div className="grid gap-8 lg:grid-cols-3">
          {FACTORY_SITES.map((site) => {
            const f = FACTORY_DETAILS[site]
            return (
              <Card key={site} padding="none" className="flex flex-col overflow-hidden">
                <OptimizedImage
                  src={f.image}
                  alt={t(`items.${site}.name`)}
                  width={800}
                  height={533}
                  aspect="3:2"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold text-neutral-900">{t(`items.${site}.name`)}</h2>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">{t(`items.${site}.subtitle`)}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-3">
                    {f.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.labelKey}>
                        <dt className="text-2xs uppercase text-neutral-400 tracking-[0.1em]">{m(metric.labelKey)}</dt>
                        <dd className="font-en-sans text-lg font-bold text-primary-700 tabular-nums">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={`/factory/${site}`}
                    className="mt-6 inline-flex items-center font-medium text-primary-500 hover:text-primary-700"
                  >
                    {t('hubCta')}
                    <span aria-hidden="true" className="ml-1">›</span>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
