import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { VisitSchema, VISIT_SITES } from './visit'

const valid = {
  companyName: '株式会社サンプル',
  contactName: '山田太郎',
  email: 'taro@example.com',
  sites: ['qingdao' as const],
  preferredDate: '',
  companions: '',
  translation: 'ja' as const,
  airportPickup: false,
  message: '',
  privacyAgreed: true as const
}

describe('VisitSchema', () => {
  it('完整合法输入通过', () => {
    expect(VisitSchema.safeParse(valid).success).toBe(true)
  })

  it('sites 空数组失败', () => {
    expect(VisitSchema.safeParse({ ...valid, sites: [] }).success).toBe(false)
  })

  it('email 错误失败', () => {
    expect(VisitSchema.safeParse({ ...valid, email: 'bad' }).success).toBe(false)
  })

  it('privacyAgreed=false 失败', () => {
    expect(VisitSchema.safeParse({ ...valid, privacyAgreed: false }).success).toBe(false)
  })

  it('Property: 任意合法据点子集（非空）通过', () => {
    fc.assert(
      fc.property(
        fc.subarray([...VISIT_SITES], { minLength: 1 }).map((a) => Array.from(new Set(a))),
        (sites) => {
          expect(VisitSchema.safeParse({ ...valid, sites }).success).toBe(true)
        }
      ),
      { numRuns: 20 }
    )
  })
})
