import { describe, it, expect } from 'vitest'
import {
  FACTORY_SITES,
  FACTORY_DETAILS,
  getFactoryDetail
} from './factory'

describe('factory details mock', () => {
  it('3 个站点、id 唯一', () => {
    expect(FACTORY_SITES).toHaveLength(3)
    expect(new Set(FACTORY_SITES).size).toBe(3)
  })

  it('每个站点详情 id 与键一致、metrics 非空', () => {
    for (const site of FACTORY_SITES) {
      const d = FACTORY_DETAILS[site]
      expect(d.id).toBe(site)
      expect(d.metrics.length).toBeGreaterThan(0)
      expect(d.capabilities.length).toBeGreaterThan(0)
    }
  })

  it('缅甸设备清单最丰富、含 X 线 2 台、有签证与物流标记', () => {
    const mm = FACTORY_DETAILS.myanmar
    expect(mm.hasVisaNote).toBe(true)
    expect(mm.hasLogistics).toBe(true)
    expect(mm.equipment.length).toBeGreaterThan(FACTORY_DETAILS.shandong.equipment.length)
    expect(mm.equipment.find((e) => e.labelKey === 'xray')?.value).toBe('2')
  })

  it('青岛为打样中心：设备清单留空（XXX）、有交通标记', () => {
    expect(FACTORY_DETAILS.qingdao.equipment).toHaveLength(0)
    expect(FACTORY_DETAILS.qingdao.hasAccess).toBe(true)
  })

  it('getFactoryDetail 命中 / 未命中', () => {
    expect(getFactoryDetail('shandong')?.id).toBe('shandong')
    expect(getFactoryDetail('nope')).toBeUndefined()
    expect(getFactoryDetail('')).toBeUndefined()
  })
})
