import type { OemStep } from '@/lib/types'

/**
 * OEM 7 步流程（plan.md §5.1 屏 6 + §5.3）
 * 数据来源：knowledge base 04 + 05 + 06
 */
export const OEM_FLOW: OemStep[] = [
  { step: 1, nameKey: 'inquiry.name', durationKey: 'inquiry.duration' },
  { step: 2, nameKey: 'hearing.name', durationKey: 'hearing.duration' },
  { step: 3, nameKey: 'quote.name', durationKey: 'quote.duration' },
  { step: 4, nameKey: 'sampling.name', durationKey: 'sampling.duration' },
  { step: 5, nameKey: 'ppSample.name', durationKey: 'ppSample.duration' },
  { step: 6, nameKey: 'production.name', durationKey: 'production.duration' },
  { step: 7, nameKey: 'shipping.name', durationKey: 'shipping.duration' }
]
