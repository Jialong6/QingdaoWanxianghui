import type { Stat } from '@/lib/types'

/**
 * Stats Bar - 4 个核心数字（plan.md §5.1 屏 2）
 * 数据来源：knowledge base 01 / 02
 */
export const STATS: Stat[] = [
  { value: '20+', labelKey: 'years' },
  { value: '2', labelKey: 'factories' },
  { value: '470', labelKey: 'staff' },
  { value: '3', labelKey: 'leadTime' }
]
