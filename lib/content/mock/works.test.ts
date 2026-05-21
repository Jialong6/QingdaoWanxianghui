import { describe, it, expect } from 'vitest'
import {
  WORKS,
  filterWorksByCategory,
  getCaseBySlug,
  getRelatedCases,
  getCaseGallery
} from './works'

describe('works mock', () => {
  it('共 12 个案例，slug 唯一', () => {
    expect(WORKS).toHaveLength(12)
    expect(new Set(WORKS.map((w) => w.id)).size).toBe(12)
  })

  it('filterWorksByCategory: all 返回全部', () => {
    expect(filterWorksByCategory(WORKS, 'all')).toHaveLength(12)
  })

  it('filterWorksByCategory: backpack 只含背包', () => {
    const r = filterWorksByCategory(WORKS, 'backpack')
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((w) => w.category === 'backpack')).toBe(true)
  })

  it('getCaseBySlug: 命中 / 未命中', () => {
    expect(getCaseBySlug('case01')?.id).toBe('case01')
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
