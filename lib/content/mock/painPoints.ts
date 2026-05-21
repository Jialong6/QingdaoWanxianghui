import type { PainPoint } from '@/lib/types'

/**
 * 5 烦恼 → 5 解决（plan.md §5.1 屏 4）
 * 推论自 knowledge base + 日本采购方常见烦恼
 */
export const PAIN_POINTS: PainPoint[] = [
  { id: 'language', problemKey: 'language.problem', solutionKey: 'language.solution' },
  { id: 'rush', problemKey: 'rush.problem', solutionKey: 'rush.solution' },
  { id: 'smallLot', problemKey: 'smallLot.problem', solutionKey: 'smallLot.solution' },
  { id: 'pricing', problemKey: 'pricing.problem', solutionKey: 'pricing.solution' },
  { id: 'transparency', problemKey: 'transparency.problem', solutionKey: 'transparency.solution' }
]
