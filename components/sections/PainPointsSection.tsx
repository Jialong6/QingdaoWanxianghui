import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui'
import { PAIN_POINTS } from '@/lib/content/mock/painPoints'

/**
 * 屏 4：お困りごと解決（plan.md §5.1）
 * - 5 个采购方烦恼 → 5 个解决，左右对照
 * - 每行：左 problem（neutral 灰）/ 右 solution（primary 蓝），中间 arrow
 */
export function PainPointsSection() {
  const t = useTranslations('home.painPoints')

  return (
    <Section
      id="pain-points"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      background="default"
    >
      <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
        {PAIN_POINTS.map((pp) => (
          <li
            key={pp.id}
            className="grid items-start gap-6 py-8 md:grid-cols-[1fr_auto_1fr] md:gap-8"
          >
            <div>
              <p className="font-en-sans text-2xs font-medium uppercase text-neutral-400 tracking-[0.2em]">
                {t('problemLabel')}
              </p>
              <p className="mt-2 text-base leading-relaxed text-neutral-600">
                {t(`items.${pp.id}.problem`)}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="hidden self-center text-3xl text-neutral-300 md:block"
            >
              →
            </div>

            <div className="rounded-lg bg-primary-50 p-5">
              <p className="font-en-sans text-2xs font-medium uppercase text-primary-700 tracking-[0.2em]">
                {t('solutionLabel')}
              </p>
              <p className="mt-2 text-base leading-relaxed text-primary-900">
                {t(`items.${pp.id}.solution`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
