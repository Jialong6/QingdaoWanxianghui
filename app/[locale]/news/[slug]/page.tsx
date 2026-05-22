import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Badge, Button, Card, OptimizedImage, JsonLd } from '@/components/ui'
import { ArticleBody } from '@/components/sections'
import { articleSchema } from '@/lib/schema'
import { ARTICLES, getArticleBySlug, getRelatedArticles } from '@/lib/content/mock/articles'

type Params = { locale: string; slug: string }

const LOCALE_TAG: Record<Locale, string> = { ja: 'ja-JP', en: 'en-US', zh: 'zh-CN' }

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ARTICLES.map((a) => ({ locale, slug: a.slug })))
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return buildBaseMetadata(locale, {
    path: `/news/${slug}`,
    title: article.title[locale],
    description: article.excerpt[locale]
  })
}

export default async function ArticleDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const t = await getTranslations('pages.news')
  const related = getRelatedArticles(article)
  const fmtDate = new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(article.publishedAt))

  const ctas = [
    { title: t('cta.caseTitle'), button: t('cta.caseButton'), href: '/works', variant: 'secondary' as const },
    { title: t('cta.processTitle'), button: t('cta.processButton'), href: '/oem-flow', variant: 'secondary' as const },
    { title: t('cta.inquiryTitle'), button: t('cta.inquiryButton'), href: '/contact/inquiry', variant: 'primary' as const }
  ]

  return (
    <Section background="subtle" containerSize="prose" spacing="normal">
      <JsonLd
        id="article-jsonld"
        data={articleSchema({
          slug: article.slug,
          headline: article.title[locale],
          description: article.excerpt[locale],
          datePublished: article.publishedAt,
          locale
        })}
      />
      <Container size="prose" className="px-0">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: t('title'), href: '/' },
            { label: t('breadcrumb'), href: '/news' },
            { label: article.title[locale] }
          ]}
        />

        <div className="mb-4 flex items-center gap-3">
          <Badge variant="primary">{t(`categories.${article.category}`)}</Badge>
          <time className="text-sm text-neutral-400" dateTime={article.publishedAt}>
            {fmtDate}
          </time>
        </div>
        <h1 className="heading-section mb-8">{article.title[locale]}</h1>

        <OptimizedImage
          src={article.cover}
          alt={article.title[locale]}
          width={1200}
          height={630}
          aspect="16:9"
          rounded
          priority
          sizes="(min-width: 768px) 720px, 100vw"
        />

        <ArticleBody blocks={article.body} locale={locale} />

        {/* タグ */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase text-neutral-400 tracking-[0.1em]">{t('detail.tagsLabel')}</span>
          {article.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 3 CTA */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {ctas.map((c) => (
            <Card key={c.href} padding="lg" className="flex flex-col text-center">
              <p className="flex-1 text-sm font-medium text-neutral-800">{c.title}</p>
              <div className="mt-4">
                <Link href={c.href} className="inline-block">
                  <Button variant={c.variant} size="sm" type="button">
                    {c.button}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* 関連記事 */}
        {related.length > 0 ? (
          <>
            <h2 className="mt-16 text-xl font-bold text-neutral-900">{t('detail.relatedTitle')}</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/news/${r.slug}`} className="group block">
                  <OptimizedImage
                    src={r.cover}
                    alt={r.title[locale]}
                    width={800}
                    height={450}
                    aspect="16:9"
                    rounded
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <p className="mt-2 text-sm font-medium text-neutral-900 group-hover:text-primary-600">
                    {r.title[locale]}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </Container>
    </Section>
  )
}
