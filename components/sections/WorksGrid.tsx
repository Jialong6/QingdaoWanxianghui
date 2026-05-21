'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Badge, OptimizedImage } from '@/components/ui'
import { cn } from '@/lib/utils/cn'
import { WORKS, filterWorksByCategory, type WorksFilter } from '@/lib/content/mock/works'

const FILTERS: WorksFilter[] = ['all', 'backpack', 'tote', 'business', 'student']

/**
 * 案例 grid + 品类 tab 筛选（客户端交互，列表页保持静态）
 * plan.md §5.5
 */
export function WorksGrid() {
  const t = useTranslations('home.works')
  const tp = useTranslations('pages.works')
  const cat = useTranslations('home.works.category')
  const tags = useTranslations('home.works.tags')
  const [filter, setFilter] = useState<WorksFilter>('all')

  const visible = filterWorksByCategory(WORKS, filter)

  return (
    <div>
      {/* 品类筛选 tab */}
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
            {f === 'all' ? tp('filterAll') : cat(f)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <Link key={c.id} href={`/works/${c.id}`} className="group block">
            <OptimizedImage
              src={c.image}
              alt={t(`items.${c.id}.title`)}
              width={800}
              height={600}
              aspect="4:3"
              rounded
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              wrapperClassName="transition-transform duration-base group-hover:-translate-y-1"
            />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="primary">{cat(c.category)}</Badge>
              <Badge variant="default">{tags(c.factory)}</Badge>
            </div>
            <h2 className="mt-3 text-base font-medium text-neutral-900 group-hover:text-primary-600">
              {t(`items.${c.id}.title`)}
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              {c.quantity === 'Sample' ? tags('qtySample') : tags('qty', { n: c.quantity })} ·{' '}
              {tags('days', { n: c.duration })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
