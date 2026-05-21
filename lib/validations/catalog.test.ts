import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { CatalogSchema } from './catalog'

const valid = {
  companyName: '株式会社サンプル',
  contactName: '山田太郎',
  email: 'taro@example.com',
  industry: 'ec' as const,
  privacyAgreed: true as const
}

describe('CatalogSchema', () => {
  it('完整合法输入通过', () => {
    expect(CatalogSchema.safeParse(valid).success).toBe(true)
  })

  it('缺会社名失败', () => {
    expect(CatalogSchema.safeParse({ ...valid, companyName: '' }).success).toBe(false)
  })

  it('email 格式错误失败', () => {
    expect(CatalogSchema.safeParse({ ...valid, email: 'bad' }).success).toBe(false)
  })

  it('未知业种失败', () => {
    expect(CatalogSchema.safeParse({ ...valid, industry: 'xxx' }).success).toBe(false)
  })

  it('privacyAgreed=false 失败', () => {
    expect(CatalogSchema.safeParse({ ...valid, privacyAgreed: false }).success).toBe(false)
  })

  it('Property: email 任意字符串返回布尔', () => {
    fc.assert(
      fc.property(fc.string(), (email) => {
        expect(typeof CatalogSchema.safeParse({ ...valid, email }).success).toBe('boolean')
      }),
      { numRuns: 50 }
    )
  })
})
