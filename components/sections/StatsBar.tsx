import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui'

const STAT_KEYS = ['years', 'factories', 'staff', 'leadTime'] as const

/**
 * 屏 2：Stats Bar（plan.md §5.1）
 * - 4 个数字 + 标签
 * - 桌面 4 列，移动 2x2
 * - tabular-nums 数字对齐
 */
export function StatsBar() {
  const t = useTranslations('home.stats')

  return (
    <section id="stats" className="border-y border-neutral-100 bg-neutral-0 py-16 md:py-20">
      <Container size="2xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STAT_KEYS.map((key) => (
            <div key={key} className="text-center">
              <p className="font-en-sans text-4xl font-bold tabular-nums text-primary-700 md:text-5xl">
                {t(key)}
              </p>
              <p className="mt-3 text-sm text-neutral-500">
                {t(`${key}Label` as const)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
