import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { SampleSchema } from './sample'

const valid = {
  companyName: '株式会社サンプル',
  contactName: '山田太郎',
  email: 'taro@example.com',
  productCategory: ['backpack' as const],
  quantity: '2',
  shippingAddress: '東京都〇〇区 1-2-3',
  privacyAgreed: true as const
}

describe('SampleSchema', () => {
  it('完整合法输入通过', () => {
    expect(SampleSchema.safeParse(valid).success).toBe(true)
  })

  it('缺配送先住所失败', () => {
    expect(SampleSchema.safeParse({ ...valid, shippingAddress: '' }).success).toBe(false)
  })

  it('品类空数组失败', () => {
    expect(SampleSchema.safeParse({ ...valid, productCategory: [] }).success).toBe(false)
  })

  it('privacyAgreed=false 失败', () => {
    expect(SampleSchema.safeParse({ ...valid, privacyAgreed: false }).success).toBe(false)
  })

  it('attachments 可选（不提供也通过）', () => {
    const { ...noAttach } = valid
    expect(SampleSchema.safeParse(noAttach).success).toBe(true)
  })

  it('Property: email 任意字符串返回布尔', () => {
    fc.assert(
      fc.property(fc.string(), (email) => {
        expect(typeof SampleSchema.safeParse({ ...valid, email }).success).toBe('boolean')
      }),
      { numRuns: 50 }
    )
  })
})
