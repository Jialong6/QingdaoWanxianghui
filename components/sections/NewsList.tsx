'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Badge, OptimizedImage } from '@/components/ui'
import { cn } from '@/lib/utils/cn'
import { type Locale } from '@/lib/i18n/config'
import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  filterArticlesByCategory,
  sortByDateDesc,
  type ArticleFilter
} from '@/lib/content/mock/articles'

const LOCALE_TAG: Record<Locale, string> = { ja: 'ja-JP', en: 'en-US', zh: 'zh-CN' }
const FILTERS: ArticleFilter[] = ['all', ...ARTICLE_CATEGORIES]

/**
 * 文章列表 + 分类筛选（客户端交互，列表页保持静态）
 * 文章本地化文案取自 content 层（不进 messages）；chrome 文案走 pages.news
 */
export function NewsList() {
  const locale = useLocale() as Locale
  const t = useTranslations('pages.news')
  const [filter, setFilter] = useState<ArticleFilter>('all')

  const visible = sortByDateDesc(filterArticlesByCategory(ARTICLES, filter))
  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat(LOCALE_TAG[locale], { year: 'numeric', month: 'long', day: 'numeric' }).format(
      new Date(iso)
    )

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              filter === f
                ? 'bg-primary-500 text-neutral-0'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            {f === 'all' ? t('filterAll') : t(`categories.${f}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => (
          <Link key={a.slug} href={`/news/${a.slug}`} className="group block">
            <OptimizedImage
              src={a.cover}
              alt={a.title[locale]}
              width={800}
              height={420}
              aspect="16:9"
              rounded
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              wrapperClassName="transition-transform duration-base group-hover:-translate-y-1"
            />
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="primary">{t(`categories.${a.category}`)}</Badge>
              <time className="text-xs text-neutral-400" dateTime={a.publishedAt}>
                {fmtDate(a.publishedAt)}
              </time>
            </div>
            <h2 className="mt-2 text-base font-medium text-neutral-900 group-hover:text-primary-600">
              {a.title[locale]}
            </h2>
            <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{a.excerpt[locale]}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
