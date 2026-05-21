import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Section, Container, Breadcrumb, OptimizedImage } from '@/components/ui'
import { ALL_FACTORIES } from '@/lib/content/mock/factory'

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

export default async function FactoryPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.factory')
  const m = await getTranslations('pages.factory.metrics')

  return (
    <Section
      eyebrow="FACTORIES"
      title={t('breadcrumb')}
      subtitle={t('intro')}
      background="subtle"
      containerSize="xl"
    >
      <Container size="xl" className="px-0">
        <Breadcrumb
          className="mb-10"
          items={[{ label: t('breadcrumb'), href: '/' }, { label: t('breadcrumb') }]}
        />

        <div className="flex flex-col gap-16">
          {ALL_FACTORIES.map((f, idx) => (
            <article
              key={f.id}
              className={`grid items-center gap-8 lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div>
                <OptimizedImage
                  src={f.image}
                  alt={t(`items.${f.id}.name`)}
                  width={1200}
                  height={800}
                  aspect="3:2"
                  rounded
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">{t(`items.${f.id}.name`)}</h2>
                <p className="mt-2 text-sm text-neutral-500">{t(`items.${f.id}.subtitle`)}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  {f.metrics.map((metric) => (
                    <div key={metric.labelKey} className="rounded border border-neutral-200 p-3">
                      <dt className="text-2xs uppercase text-neutral-400 tracking-[0.1em]">
                        {m(metric.labelKey)}
                      </dt>
                      <dd className="mt-1 font-en-sans text-xl font-bold text-primary-700 tabular-nums">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
