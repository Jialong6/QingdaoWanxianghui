import type { FactoryInfo } from '@/lib/types'

const PLACEHOLDER = (text: string) =>
  `https://placehold.co/1200x800/1A3B5B/FAFAF7?text=${encodeURIComponent(text)}`

/**
 * 双工厂展示（plan.md §5.1 屏 7 + §5.4）
 * 数据来源：knowledge base 02 工厂硬件
 */
export const FACTORIES: FactoryInfo[] = [
  {
    id: 'shandong',
    nameKey: 'shandong.name',
    subtitleKey: 'shandong.subtitle',
    image: PLACEHOLDER('Shandong Factory'),
    metrics: [
      { value: '8,000㎡', labelKey: 'area' },
      { value: '100', labelKey: 'staff' },
      { value: '120', labelKey: 'flatMachine' },
      { value: '22', labelKey: 'computerMachine' }
    ]
  },
  {
    id: 'myanmar',
    nameKey: 'myanmar.name',
    subtitleKey: 'myanmar.subtitle',
    image: PLACEHOLDER('Myanmar Factory'),
    metrics: [
      { value: '370', labelKey: 'staff' },
      { value: '420', labelKey: 'flatMachine' },
      { value: '48', labelKey: 'computerMachine' },
      { value: '2', labelKey: 'xrayMachine' }
    ]
  }
]

/**
 * 青岛打样中心（plan.md §5.4.2）—— 仅 /factory 页面用，不进首页双工厂展示
 * XXX-具体面积/人员/设备待客户确认
 */
export const QINGDAO: FactoryInfo = {
  id: 'qingdao',
  nameKey: 'qingdao.name',
  subtitleKey: 'qingdao.subtitle',
  image: PLACEHOLDER('Qingdao Sample Center'),
  metrics: [
    { value: '1', labelKey: 'sampleWeeks' },
    { value: '4', labelKey: 'coreServices' }
  ]
}

/** 三拠点合集（青岛打样 + 山东 + 缅甸），/factory 页面用 */
export const ALL_FACTORIES: FactoryInfo[] = [QINGDAO, ...FACTORIES]

// ── M10: 工厂三子页 ──────────────────────────────────────────────

/** 工厂子页站点 id（动态路由 /factory/[site]） */
export const FACTORY_SITES = ['qingdao', 'shandong', 'myanmar'] as const
export type FactorySite = (typeof FACTORY_SITES)[number]

/** 设备清单条目：i18n 标签 key + 台数（语言中性） */
export interface EquipmentItem {
  labelKey: string
  value: string
}

/**
 * 工厂详情（plan.md §5.4.2-5.4.4）
 * 数据来源：knowledge base 02 工厂硬件
 * - metrics：概览关键数字（与 hub 卡片复用）
 * - equipment：设备清单台数
 * - capabilities：得意受注 i18n key（messages sites.{id}.capabilities.{cap}）
 */
export interface FactoryDetail {
  id: FactorySite
  image: string
  metrics: Array<{ value: string; labelKey: string }>
  equipment: EquipmentItem[]
  capabilities: readonly string[]
  /** 缅甸：签证手续提示 */
  hasVisaNote?: boolean
  /** 缅甸：物流路线 */
  hasLogistics?: boolean
  /** 青岛：交通アクセス */
  hasAccess?: boolean
}

export const FACTORY_DETAILS: Record<FactorySite, FactoryDetail> = {
  // 青岛打样中心：开发/打样，1 周首样；设备与地址 XXX 待客户确认
  qingdao: {
    id: 'qingdao',
    image: PLACEHOLDER('Qingdao Sample Center'),
    metrics: [
      { value: '1', labelKey: 'sampleWeeks' },
      { value: '4', labelKey: 'coreServices' }
    ],
    equipment: [], // XXX-青岛打样中心具体设备清单待客户确认
    capabilities: ['development', 'sampling', 'revision', 'costing'],
    hasAccess: true
  },
  // 山东日照：8,000㎡ / ~100 人；打样・国内小批量・多款・急单
  shandong: {
    id: 'shandong',
    image: PLACEHOLDER('Shandong Factory'),
    metrics: [
      { value: '8,000㎡', labelKey: 'area' },
      { value: '100', labelKey: 'staff' },
      { value: '120', labelKey: 'flatMachine' },
      { value: '22', labelKey: 'computerMachine' }
    ],
    equipment: [
      { labelKey: 'flat', value: '120' },
      { labelKey: 'computer', value: '22' },
      { labelKey: 'auxiliary', value: '20+' },
      { labelKey: 'xray', value: '1' }
    ],
    capabilities: ['sampling', 'smallLot', 'multiStyle', 'rush']
  },
  // 缅甸仰光 Better Bags：~370 人，重设备产能；中大货长单
  myanmar: {
    id: 'myanmar',
    image: PLACEHOLDER('Myanmar Factory'),
    metrics: [
      { value: '370', labelKey: 'staff' },
      { value: '420', labelKey: 'flatMachine' },
      { value: '48', labelKey: 'computerMachine' },
      { value: '2', labelKey: 'xrayMachine' }
    ],
    equipment: [
      { labelKey: 'flat', value: '420' },
      { labelKey: 'computer', value: '48' },
      { labelKey: 'post', value: '60' },
      { labelKey: 'doubleNeedle', value: '12' },
      { labelKey: 'cutting', value: '10' },
      { labelKey: 'riveting', value: '10' },
      { labelKey: 'xray', value: '2' },
      { labelKey: 'swingArm', value: '2' },
      { labelKey: 'tapeCutting', value: '5' },
      { labelKey: 'steaming', value: '1' }
    ],
    capabilities: ['bulk', 'repeat', 'laborIntensive'],
    hasVisaNote: true,
    hasLogistics: true
  }
}

/** 按 site 取详情；未知返回 undefined（子页 notFound 用） */
export function getFactoryDetail(site: string): FactoryDetail | undefined {
  return (FACTORY_SITES as readonly string[]).includes(site)
    ? FACTORY_DETAILS[site as FactorySite]
    : undefined
}
