import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Section } from '@/components/ui'
import { OEM_FLOW } from '@/lib/content/mock/oemFlow'

/**
 * 屏 6：OEM の流れ 7 step（plan.md §5.1）
 * - 桌面：横向流程，每步 1/7 宽，带连接线 + step 编号圆圈
 * - 移动：纵向时间轴
 */
export function OemFlowSection() {
  const t = useTranslations('home.oemFlow')

  return (
    <Section
      id="oem-flow"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      background="default"
      containerSize="2xl"
    >
      <ol className="grid gap-6 md:grid-cols-7 md:gap-2">
        {OEM_FLOW.map((step, idx) => (
          <li key={step.step} className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
            <div className="relative flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 font-en-sans text-sm font-bold text-neutral-0">
                {step.step}
              </div>
              {idx < OEM_FLOW.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-10 -ml-px h-full w-px bg-neutral-200 md:left-full md:top-1/2 md:ml-2 md:h-px md:w-8"
                />
              ) : null}
            </div>
            <div className="md:mt-3">
              <p className="text-sm font-bold text-neutral-900">
                {t(`items.${step.nameKey.split('.')[0]}.name`)}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                {t(`items.${step.nameKey.split('.')[0]}.duration`)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 text-center">
        <Link
          href="/oem-flow"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 transition-colors hover:text-primary-700"
        >
          {t('viewMore')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}
