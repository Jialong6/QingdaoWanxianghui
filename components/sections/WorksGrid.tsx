'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Badge, OptimizedImage } from '@/components/ui'
import { cn } from '@/lib/utils/cn'
import {
  WORKS,
  SCENE_TAGS,
  MATERIAL_TAGS,
  filterWorks,
  type WorksCriteria
} from '@/lib/content/mock/works'

const ALL_CRITERIA: WorksCriteria = {
  category: 'all',
  scene: 'all',
  factory: 'all',
  material: 'all'
}

const CATEGORY_OPTIONS = ['all', 'backpack', 'tote', 'business', 'student', 'other'] as const
const FACTORY_OPTIONS = ['all', 'qingdao', 'shandong', 'myanmar'] as const

/**
 * 案例 grid + 四维 AND 组合筛选（plan.md §5.5）
 * 品类 × 用途 × 生産拠点 × 素材；客户端交互，列表页保持静态
 */
export function WorksGrid() {
  const t = useTranslations('home.works')
  const tp = useTranslations('pages.works')
  const cat = useTranslations('home.works.category')
  const scene = useTranslations('home.works.scene')
  const material = useTranslations('home.works.material')
  const tags = useTranslations('home.works.tags')
  const [criteria, setCriteria] = useState<WorksCriteria>(ALL_CRITERIA)

  const visible = filterWorks(WORKS, criteria)

  const groups: Array<{
    axis: keyof WorksCriteria
    label: string
    options: readonly string[]
    optionLabel: (o: string) => string
  }> = [
    {
      axis: 'category',
      label: tp('filterCategoryLabel'),
      options: CATEGORY_OPTIONS,
      optionLabel: (o) => (o === 'all' ? tp('filterAll') : cat(o))
    },
    {
      axis: 'scene',
      label: tp('filterSceneLabel'),
      options: ['all', ...SCENE_TAGS],
      optionLabel: (o) => (o === 'all' ? tp('filterAll') : scene(o))
    },
    {
      axis: 'factory',
      label: tp('filterFactoryLabel'),
      options: FACTORY_OPTIONS,
      optionLabel: (o) => (o === 'all' ? tp('filterAll') : tags(o))
    },
    {
      axis: 'material',
      label: tp('filterMaterialLabel'),
      options: ['all', ...MATERIAL_TAGS],
      optionLabel: (o) => (o === 'all' ? tp('filterAll') : material(o))
    }
  ]

  const isDirty = (Object.keys(criteria) as Array<keyof WorksCriteria>).some(
    (k) => criteria[k] !== 'all'
  )

  return (
    <div>
      {/* 多维筛选 */}
      <div className="mb-10 space-y-5">
        {groups.map((g) => (
          <div key={g.axis} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="w-24 shrink-0 text-2xs font-medium uppercase tracking-[0.12em] text-neutral-400">
              {g.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {g.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setCriteria((prev) => ({ ...prev, [g.axis]: o }) as WorksCriteria)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    criteria[g.axis] === o
                      ? 'bg-primary-500 text-neutral-0'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  )}
                >
                  {g.optionLabel(o)}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 pt-1">
          <button
            type="button"
            onClick={() => setCriteria(ALL_CRITERIA)}
            disabled={!isDirty}
            className={cn(
              'text-sm font-medium transition-colors',
              isDirty ? 'text-primary-600 hover:text-primary-700' : 'cursor-default text-neutral-300'
            )}
          >
            {tp('filterReset')}
          </button>
          <span className="text-sm text-neutral-500">{tp('resultCount', { n: visible.length })}</span>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg bg-neutral-50 py-16 text-center text-sm text-neutral-500">
          {tp('noResults')}
        </p>
      ) : (
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
                <Badge variant="default">{scene(c.scene)}</Badge>
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
      )}
    </div>
  )
}
