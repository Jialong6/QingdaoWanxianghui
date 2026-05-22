import type { CaseItem, SceneTag, MaterialTag, FactoryTag } from '@/lib/types'

// XXX-TODO: 待客户提供真实脱敏案例图与文案，目前为参考 knowledge 03 构造的占位
const PLACEHOLDER = (text: string) =>
  `https://placehold.co/800x600/2C5F8D/FAFAF7?text=${encodeURIComponent(text)}`

/**
 * 24 个匿名案例（plan.md §5.5）
 * - 工厂 tag: qingdao（打样）/ shandong（国内大货）/ myanmar（海外大货）
 * - 多维筛选: category（产品形态）× scene（用途）× factory（拠点）× material（素材）
 * - 数据来源：knowledge base 03 产品线 + 业种推论
 */
export const WORKS: CaseItem[] = [
  {
    id: 'case01',
    image: PLACEHOLDER('EC Backpack 01'),
    titleKey: 'case01.title',
    category: 'backpack',
    scene: 'commute',
    material: 'nylon',
    quantity: '1,500',
    factory: 'myanmar',
    duration: '90'
  },
  {
    id: 'case02',
    image: PLACEHOLDER('Tote 02'),
    titleKey: 'case02.title',
    category: 'tote',
    scene: 'business',
    material: 'canvas',
    quantity: '3,000',
    factory: 'myanmar',
    duration: '95'
  },
  {
    id: 'case03',
    image: PLACEHOLDER('Business 03'),
    titleKey: 'case03.title',
    category: 'business',
    scene: 'business',
    material: 'leather',
    quantity: '600',
    factory: 'shandong',
    duration: '60'
  },
  {
    id: 'case04',
    image: PLACEHOLDER('School 04'),
    titleKey: 'case04.title',
    category: 'student',
    scene: 'school',
    material: 'polyester',
    quantity: '5,000',
    factory: 'myanmar',
    duration: '120'
  },
  {
    id: 'case05',
    image: PLACEHOLDER('Outdoor 05'),
    titleKey: 'case05.title',
    category: 'backpack',
    scene: 'outdoor',
    material: 'nylon',
    quantity: '800',
    factory: 'shandong',
    duration: '45'
  },
  {
    id: 'case06',
    image: PLACEHOLDER('Tote Eco 06'),
    titleKey: 'case06.title',
    category: 'tote',
    scene: 'business',
    material: 'recycled',
    quantity: '2,000',
    factory: 'myanmar',
    duration: '90'
  },
  {
    id: 'case07',
    image: PLACEHOLDER('Backpack Rush 07'),
    titleKey: 'case07.title',
    category: 'backpack',
    scene: 'commute',
    material: 'polyester',
    quantity: '300',
    factory: 'qingdao',
    duration: '30'
  },
  {
    id: 'case08',
    image: PLACEHOLDER('Business Sample 08'),
    titleKey: 'case08.title',
    category: 'business',
    scene: 'business',
    material: 'leather',
    quantity: 'Sample',
    factory: 'qingdao',
    duration: '7'
  },
  {
    id: 'case09',
    image: PLACEHOLDER('Travel 09'),
    titleKey: 'case09.title',
    category: 'backpack',
    scene: 'travel',
    material: 'nylon',
    quantity: '1,200',
    factory: 'myanmar',
    duration: '100'
  },
  {
    id: 'case10',
    image: PLACEHOLDER('Premium Tote 10'),
    titleKey: 'case10.title',
    category: 'tote',
    scene: 'business',
    material: 'leather',
    quantity: '500',
    factory: 'shandong',
    duration: '50'
  },
  {
    id: 'case11',
    image: PLACEHOLDER('Commuter 11'),
    titleKey: 'case11.title',
    category: 'business',
    scene: 'commute',
    material: 'polyester',
    quantity: '2,500',
    factory: 'myanmar',
    duration: '90'
  },
  {
    id: 'case12',
    image: PLACEHOLDER('Kids 12'),
    titleKey: 'case12.title',
    category: 'student',
    scene: 'school',
    material: 'recycled',
    quantity: '1,800',
    factory: 'myanmar',
    duration: '95'
  },
  {
    id: 'case13',
    image: PLACEHOLDER('Outdoor Pack 13'),
    titleKey: 'case13.title',
    category: 'backpack',
    scene: 'outdoor',
    material: 'canvas',
    quantity: '1,000',
    factory: 'shandong',
    duration: '50'
  },
  {
    id: 'case14',
    image: PLACEHOLDER('Travel Tote 14'),
    titleKey: 'case14.title',
    category: 'tote',
    scene: 'travel',
    material: 'nylon',
    quantity: '2,200',
    factory: 'myanmar',
    duration: '90'
  },
  {
    id: 'case15',
    image: PLACEHOLDER('Business Light 15'),
    titleKey: 'case15.title',
    category: 'business',
    scene: 'business',
    material: 'nylon',
    quantity: '700',
    factory: 'shandong',
    duration: '55'
  },
  {
    id: 'case16',
    image: PLACEHOLDER('School Pack 16'),
    titleKey: 'case16.title',
    category: 'student',
    scene: 'school',
    material: 'polyester',
    quantity: '4,000',
    factory: 'myanmar',
    duration: '110'
  },
  {
    id: 'case17',
    image: PLACEHOLDER('Travel Pack 17'),
    titleKey: 'case17.title',
    category: 'backpack',
    scene: 'travel',
    material: 'recycled',
    quantity: '1,500',
    factory: 'myanmar',
    duration: '95'
  },
  {
    id: 'case18',
    image: PLACEHOLDER('Commute Tote 18'),
    titleKey: 'case18.title',
    category: 'tote',
    scene: 'commute',
    material: 'canvas',
    quantity: '400',
    factory: 'qingdao',
    duration: '35'
  },
  {
    id: 'case19',
    image: PLACEHOLDER('Business Pro 19'),
    titleKey: 'case19.title',
    category: 'business',
    scene: 'business',
    material: 'leather',
    quantity: '900',
    factory: 'myanmar',
    duration: '80'
  },
  {
    id: 'case20',
    image: PLACEHOLDER('Commute Pack 20'),
    titleKey: 'case20.title',
    category: 'backpack',
    scene: 'commute',
    material: 'polyester',
    quantity: '1,300',
    factory: 'shandong',
    duration: '48'
  },
  {
    id: 'case21',
    image: PLACEHOLDER('Pouch Set 21'),
    titleKey: 'case21.title',
    category: 'other',
    scene: 'outdoor',
    material: 'nylon',
    quantity: '1,100',
    factory: 'myanmar',
    duration: '92'
  },
  {
    id: 'case22',
    image: PLACEHOLDER('Eco Tote 22'),
    titleKey: 'case22.title',
    category: 'tote',
    scene: 'school',
    material: 'recycled',
    quantity: '2,600',
    factory: 'myanmar',
    duration: '88'
  },
  {
    id: 'case23',
    image: PLACEHOLDER('Outdoor Sample 23'),
    titleKey: 'case23.title',
    category: 'backpack',
    scene: 'outdoor',
    material: 'nylon',
    quantity: 'Sample',
    factory: 'qingdao',
    duration: '7'
  },
  {
    id: 'case24',
    image: PLACEHOLDER('Student Daily 24'),
    titleKey: 'case24.title',
    category: 'student',
    scene: 'commute',
    material: 'canvas',
    quantity: '1,600',
    factory: 'shandong',
    duration: '52'
  }
]

/** 用途场景筛选选项（驱动 UI 与 i18n key） */
export const SCENE_TAGS: SceneTag[] = ['commute', 'business', 'school', 'outdoor', 'travel']

/** 主素材筛选选项 */
export const MATERIAL_TAGS: MaterialTag[] = ['nylon', 'polyester', 'canvas', 'recycled', 'leather']

/** 案例品类筛选；'all' 返回全部 */
export type WorksFilter = CaseItem['category'] | 'all'

export function filterWorksByCategory(works: CaseItem[], filter: WorksFilter): CaseItem[] {
  if (filter === 'all') return works
  return works.filter((w) => w.category === filter)
}

/** 多维筛选条件：每维 'all' 表示不约束，其余按 AND 组合过滤 */
export interface WorksCriteria {
  category: WorksFilter
  scene: SceneTag | 'all'
  factory: FactoryTag | 'all'
  material: MaterialTag | 'all'
}

/** 四维 AND 组合筛选（category × scene × factory × material） */
export function filterWorks(works: CaseItem[], c: WorksCriteria): CaseItem[] {
  return works.filter(
    (w) =>
      (c.category === 'all' || w.category === c.category) &&
      (c.scene === 'all' || w.scene === c.scene) &&
      (c.factory === 'all' || w.factory === c.factory) &&
      (c.material === 'all' || w.material === c.material)
  )
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
