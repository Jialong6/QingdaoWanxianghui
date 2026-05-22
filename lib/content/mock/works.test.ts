import { describe, it, expect } from 'vitest'
import {
  WORKS,
  SCENE_TAGS,
  MATERIAL_TAGS,
  filterWorksByCategory,
  filterWorks,
  getCaseBySlug,
  getRelatedCases,
  getCaseGallery
} from './works'

describe('works mock', () => {
  it('共 24 个案例，slug 唯一', () => {
    expect(WORKS).toHaveLength(24)
    expect(new Set(WORKS.map((w) => w.id)).size).toBe(24)
  })

  it('每个案例都有合法 scene / material', () => {
    expect(WORKS.every((w) => SCENE_TAGS.includes(w.scene))).toBe(true)
    expect(WORKS.every((w) => MATERIAL_TAGS.includes(w.material))).toBe(true)
  })

  it('filterWorksByCategory: all 返回全部', () => {
    expect(filterWorksByCategory(WORKS, 'all')).toHaveLength(24)
  })

  it('filterWorksByCategory: backpack 只含背包', () => {
    const r = filterWorksByCategory(WORKS, 'backpack')
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((w) => w.category === 'backpack')).toBe(true)
  })

  it('filterWorks: 全 all 返回全部 24', () => {
    expect(
      filterWorks(WORKS, { category: 'all', scene: 'all', factory: 'all', material: 'all' })
    ).toHaveLength(24)
  })

  it('filterWorks: 单维约束（scene=outdoor）', () => {
    const r = filterWorks(WORKS, { category: 'all', scene: 'outdoor', factory: 'all', material: 'all' })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((w) => w.scene === 'outdoor')).toBe(true)
  })

  it('filterWorks: 双维 AND 组合（backpack × myanmar）', () => {
    const r = filterWorks(WORKS, {
      category: 'backpack',
      scene: 'all',
      factory: 'myanmar',
      material: 'all'
    })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((w) => w.category === 'backpack' && w.factory === 'myanmar')).toBe(true)
  })

  it('filterWorks: 无匹配组合返回空数组', () => {
    // student × qingdao 无此组合
    const r = filterWorks(WORKS, {
      category: 'student',
      scene: 'all',
      factory: 'qingdao',
      material: 'all'
    })
    expect(r).toEqual([])
  })

  it('getCaseBySlug: 命中 / 未命中', () => {
    expect(getCaseBySlug('case24')?.id).toBe('case24')
    expect(getCaseBySlug('nope')).toBeUndefined()
  })

  it('getRelatedCases: 同品类、排除自身、最多 3 个', () => {
    const item = WORKS[0]
    const related = getRelatedCases(item)
    expect(related.length).toBeLessThanOrEqual(3)
    expect(related.every((r) => r.id !== item.id)).toBe(true)
    expect(related.every((r) => r.category === item.category)).toBe(true)
  })

  it('getCaseGallery: 返回 6 张图', () => {
    expect(getCaseGallery('case01')).toHaveLength(6)
  })
})
