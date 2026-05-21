import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Section, Card } from '@/components/ui'
import { STRENGTHS } from '@/lib/content/mock/strengths'

/**
 * 屏 3：5 つの強み（plan.md §5.1）
 * - 5 大强项卡片网格（桌面 5 列 / 平板 2-3 列 / 移动 1 列）
 * - Card hoverable + icon + title + desc
 */
export function StrengthsSection() {
  const t = useTranslations('home.strengths')

  return (
    <Section
      id="strengths"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      background="subtle"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {STRENGTHS.map((s) => (
          <Card key={s.id} hoverable padding="md" className="flex flex-col">
            <span
              aria-hidden="true"
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-2xl text-primary-700"
            >
              {s.icon}
            </span>
            <h3 className="text-lg font-bold text-neutral-900">{t(`items.${s.id}.title`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {t(`items.${s.id}.desc`)}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/strength"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 transition-colors hover:text-primary-700"
        >
          {t('viewMore')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}
