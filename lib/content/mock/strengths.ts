import type { Strength } from '@/lib/types'

/**
 * 5 大强项（plan.md §5.1 屏 3 + §5.2）
 * 数据来源：knowledge base 01-06
 */
export const STRENGTHS: Strength[] = [
  { id: 'dualFactory', titleKey: 'dualFactory.title', descKey: 'dualFactory.desc', icon: '⚙' },
  { id: 'sampling', titleKey: 'sampling.title', descKey: 'sampling.desc', icon: '✂' },
  { id: 'quality', titleKey: 'quality.title', descKey: 'quality.desc', icon: '✓' },
  { id: 'experience', titleKey: 'experience.title', descKey: 'experience.desc', icon: '★' },
  { id: 'commercial', titleKey: 'commercial.title', descKey: 'commercial.desc', icon: '$' }
]
