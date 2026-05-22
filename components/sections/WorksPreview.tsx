import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Section, Badge, OptimizedImage } from '@/components/ui'
import { WORKS } from '@/lib/content/mock/works'

/**
 * 屏 5：制作事例 12 缩略图（plan.md §5.1）
 * - 首页只预览前 12（全 24 例在 /works，多维筛选）
 * - 4×3 网格（lg）/ 2×6（md）/ 1×12（sm）
 * - 每张：图 + tag 行（品类/工厂/数量/周期）+ 匿名标题
 */
const PREVIEW = WORKS.slice(0, 12)

export function WorksPreview() {
  const t = useTranslations('home.works')
  const tags = useTranslations('home.works.tags')
  const cat = useTranslations('home.works.category')

  return (
    <Section
      id="works"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      background="subtle"
      containerSize="2xl"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PREVIEW.map((c) => (
          <article key={c.id} className="group">
            <OptimizedImage
              src={c.image}
              alt={t(`items.${c.id}.title`)}
              width={800}
              height={600}
              aspect="4:3"
              rounded
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              wrapperClassName="transition-transform duration-base group-hover:-translate-y-1"
            />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="primary">{cat(c.category)}</Badge>
              <Badge variant="default">{tags(c.factory)}</Badge>
            </div>
            <h3 className="mt-3 text-base font-medium text-neutral-900">
              {t(`items.${c.id}.title`)}
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              {c.quantity === 'Sample'
                ? tags('qtySample')
                : tags('qty', { n: c.quantity })}{' '}
              · {tags('days', { n: c.duration })}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/works"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 transition-colors hover:text-primary-700"
        >
          {t('viewMore')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}
