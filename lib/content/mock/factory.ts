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
