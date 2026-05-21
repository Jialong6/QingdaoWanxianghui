import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Badge, Button, OptimizedImage } from '@/components/ui'
import {
  WORKS,
  getCaseBySlug,
  getCaseGallery,
  getRelatedCases,
  CASE_HIGHLIGHT_KEYS
} from '@/lib/content/mock/works'

type Params = { locale: string; slug: string }

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => WORKS.map((w) => ({ locale, slug: w.id })))
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  if (!getCaseBySlug(slug)) return {}
  const t = await getTranslations({ locale, namespace: 'home.works' })
  return buildBaseMetadata(locale, { path: `/works/${slug}`, title: t(`items.${slug}.title`) })
}

export default async function WorkDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const item = getCaseBySlug(slug)
  if (!item) notFound()

  const t = await getTranslations('home.works')
  const tp = await getTranslations('pages.works')
  const td = await getTranslations('pages.works.detail')
  const cat = await getTranslations('home.works.category')
  const tags = await getTranslations('home.works.tags')
  const tNav = await getTranslations('nav')

  const gallery = getCaseGallery(item.id)
  const related = getRelatedCases(item)

  return (
    <Section background="subtle" containerSize="lg" spacing="normal">
      <Container size="lg" className="px-0">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: t('title'), href: '/' },
            { label: tp('breadcrumb'), href: '/works' },
            { label: t(`items.${item.id}.title`) }
          ]}
        />

        <h1 className="heading-section mb-6">{t(`items.${item.id}.title`)}</h1>

        <OptimizedImage
          src={item.image}
          alt={t(`items.${item.id}.title`)}
          width={1200}
          height={800}
          aspect="3:2"
          rounded
          priority
          sizes="(min-width: 1024px) 880px, 100vw"
        />

        {/* メタ情報 */}
        <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: td('metaCategory'), value: cat(item.category) },
            {
              label: td('metaQuantity'),
              value: item.quantity === 'Sample' ? tags('qtySample') : tags('qty', { n: item.quantity })
            },
            { label: td('metaFactory'), value: tags(item.factory) },
            { label: td('metaDuration'), value: tags('days', { n: item.duration }) }
          ].map((meta) => (
            <div key={meta.label} className="rounded border border-neutral-200 bg-neutral-0 p-3">
              <dt className="text-2xs uppercase text-neutral-400 tracking-[0.1em]">{meta.label}</dt>
              <dd className="mt-1 text-sm font-medium text-neutral-800">{meta.value}</dd>
            </div>
          ))}
        </dl>

        {/* プロジェクト概要 */}
        <h2 className="mt-12 text-xl font-bold text-neutral-900">{td('overviewTitle')}</h2>
        <p className="text-body mt-3">{td('overviewBody')}</p>

        {/* 工程ハイライト */}
        <h2 className="mt-12 text-xl font-bold text-neutral-900">{td('highlightsTitle')}</h2>
        <ul className="mt-4 space-y-2">
          {CASE_HIGHLIGHT_KEYS.map((k) => (
            <li key={k} className="flex items-start gap-2 text-sm text-neutral-700">
              <span aria-hidden="true" className="mt-1 text-primary-500">
                ✓
              </span>
              {td(`highlights.${k}`)}
            </li>
          ))}
        </ul>

        {/* ギャラリー */}
        <h2 className="mt-12 text-xl font-bold text-neutral-900">{td('galleryTitle')}</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((src, i) => (
            <OptimizedImage
              key={src}
              src={src}
              alt={`${t(`items.${item.id}.title`)} ${i + 1}`}
              width={800}
              height={600}
              aspect="4:3"
              rounded
              sizes="(min-width: 768px) 33vw, 50vw"
            />
          ))}
        </div>

        {/* 関連事例 */}
        {related.length > 0 ? (
          <>
            <h2 className="mt-12 text-xl font-bold text-neutral-900">{td('relatedTitle')}</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/works/${r.id}`} className="group block">
                  <OptimizedImage
                    src={r.image}
                    alt={t(`items.${r.id}.title`)}
                    width={800}
                    height={600}
                    aspect="4:3"
                    rounded
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="primary">{cat(r.category)}</Badge>
                  </div>
                  <p className="mt-2 text-sm font-medium text-neutral-900 group-hover:text-primary-600">
                    {t(`items.${r.id}.title`)}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : null}

        {/* CTA */}
        <div className="mt-16 rounded-lg bg-primary-900 p-8 text-center">
          <p className="mb-6 text-lg font-medium text-neutral-0">{td('cta')}</p>
          <Link href="/contact/inquiry" className="inline-block">
            <Button variant="accent" size="lg" type="button">
              {tNav('contact')}
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
