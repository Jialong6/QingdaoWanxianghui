import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import {
  WORKS,
  SCENE_TAGS,
  MATERIAL_TAGS,
  filterWorks,
  type WorksCriteria
} from '@/lib/content/mock/works'

const categoryArb = fc.constantFrom<WorksCriteria['category']>(
  'all',
  'backpack',
  'tote',
  'business',
  'student',
  'other'
)
const sceneArb = fc.constantFrom<WorksCriteria['scene']>('all', ...SCENE_TAGS)
const factoryArb = fc.constantFrom<WorksCriteria['factory']>('all', 'qingdao', 'shandong', 'myanmar')
const materialArb = fc.constantFrom<WorksCriteria['material']>('all', ...MATERIAL_TAGS)

const criteriaArb: fc.Arbitrary<WorksCriteria> = fc.record({
  category: categoryArb,
  scene: sceneArb,
  factory: factoryArb,
  material: materialArb
})

describe('filterWorks property', () => {
  it('Property: 结果恒为 WORKS 子集，且每条满足全部非 all 约束', () => {
    fc.assert(
      fc.property(criteriaArb, (c) => {
        const result = filterWorks(WORKS, c)
        // 子集：每条结果都来自 WORKS
        expect(result.every((w) => WORKS.includes(w))).toBe(true)
        // 每条结果满足全部非 'all' 约束
        for (const w of result) {
          if (c.category !== 'all') expect(w.category).toBe(c.category)
          if (c.scene !== 'all') expect(w.scene).toBe(c.scene)
          if (c.factory !== 'all') expect(w.factory).toBe(c.factory)
          if (c.material !== 'all') expect(w.material).toBe(c.material)
        }
      }),
      { numRuns: 100 }
    )
  })

  it('Property: 全 all 等价于不过滤', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const r = filterWorks(WORKS, {
          category: 'all',
          scene: 'all',
          factory: 'all',
          material: 'all'
        })
        expect(r).toHaveLength(WORKS.length)
      }),
      { numRuns: 1 }
    )
  })
})
