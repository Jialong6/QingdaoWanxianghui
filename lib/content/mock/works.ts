import type { CaseItem } from '@/lib/types'

// XXX-TODO: 待客户提供真实脱敏案例图与文案，目前为参考 knowledge 03 构造的占位
const PLACEHOLDER = (text: string) =>
  `https://placehold.co/800x600/2C5F8D/FAFAF7?text=${encodeURIComponent(text)}`

/**
 * 12 个匿名案例（plan.md §5.1 屏 5）
 * - 工厂 tag: qingdao（打样）/ shandong（国内大货）/ myanmar（海外大货）
 * - 数据来源：knowledge base 03 产品线 + 业种推论
 */
export const WORKS: CaseItem[] = [
  {
    id: 'case01',
    image: PLACEHOLDER('EC Backpack 01'),
    titleKey: 'case01.title',
    category: 'backpack',
    quantity: '1,500',
    factory: 'myanmar',
    duration: '90'
  },
  {
    id: 'case02',
    image: PLACEHOLDER('Tote 02'),
    titleKey: 'case02.title',
    category: 'tote',
    quantity: '3,000',
    factory: 'myanmar',
    duration: '95'
  },
  {
    id: 'case03',
    image: PLACEHOLDER('Business 03'),
    titleKey: 'case03.title',
    category: 'business',
    quantity: '600',
    factory: 'shandong',
    duration: '60'
  },
  {
    id: 'case04',
    image: PLACEHOLDER('School 04'),
    titleKey: 'case04.title',
    category: 'student',
    quantity: '5,000',
    factory: 'myanmar',
    duration: '120'
  },
  {
    id: 'case05',
    image: PLACEHOLDER('Outdoor 05'),
    titleKey: 'case05.title',
    category: 'backpack',
    quantity: '800',
    factory: 'shandong',
    duration: '45'
  },
  {
    id: 'case06',
    image: PLACEHOLDER('Tote Eco 06'),
    titleKey: 'case06.title',
    category: 'tote',
    quantity: '2,000',
    factory: 'myanmar',
    duration: '90'
  },
  {
    id: 'case07',
    image: PLACEHOLDER('Backpack Rush 07'),
    titleKey: 'case07.title',
    category: 'backpack',
    quantity: '300',
    factory: 'qingdao',
    duration: '30'
  },
  {
    id: 'case08',
    image: PLACEHOLDER('Business Sample 08'),
    titleKey: 'case08.title',
    category: 'business',
    quantity: 'Sample',
    factory: 'qingdao',
    duration: '7'
  },
  {
    id: 'case09',
    image: PLACEHOLDER('Travel 09'),
    titleKey: 'case09.title',
    category: 'backpack',
    quantity: '1,200',
    factory: 'myanmar',
    duration: '100'
  },
  {
    id: 'case10',
    image: PLACEHOLDER('Premium Tote 10'),
    titleKey: 'case10.title',
    category: 'tote',
    quantity: '500',
    factory: 'shandong',
    duration: '50'
  },
  {
    id: 'case11',
    image: PLACEHOLDER('Commuter 11'),
    titleKey: 'case11.title',
    category: 'business',
    quantity: '2,500',
    factory: 'myanmar',
    duration: '90'
  },
  {
    id: 'case12',
    image: PLACEHOLDER('Kids 12'),
    titleKey: 'case12.title',
    category: 'student',
    quantity: '1,800',
    factory: 'myanmar',
    duration: '95'
  }
]

/** 案例品类筛选；'all' 返回全部 */
export type WorksFilter = CaseItem['category'] | 'all'

export function filterWorksByCategory(works: CaseItem[], filter: WorksFilter): CaseItem[] {
  if (filter === 'all') return works
  return works.filter((w) => w.category === filter)
}

/** 按 slug（= id）查案例 */
export function getCaseBySlug(slug: string): CaseItem | undefined {
  return WORKS.find((w) => w.id === slug)
}

/** 详情页 ギャラリー 占位图（XXX-待客户实拍替换） */
export function getCaseGallery(id: string): string[] {
  return Array.from({ length: 6 }, (_, i) => PLACEHOLDER(`${id}-${i + 1}`))
}

/** 详情页「工程ハイライト」i18n key（每案例固定 3 条） */
export const CASE_HIGHLIGHT_KEYS = ['0', '1', '2'] as const

/** 相关案例（同品类，排除自身，最多 3 个） */
export function getRelatedCases(current: CaseItem, limit = 3): CaseItem[] {
  return WORKS.filter((w) => w.id !== current.id && w.category === current.category).slice(0, limit)
}
