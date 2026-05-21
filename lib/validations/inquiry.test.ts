import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { InquirySchema, PRODUCT_CATEGORIES } from './inquiry'

const validInput = {
  companyName: '株式会社サンプル',
  contactName: '山田太郎',
  email: 'taro@example.com',
  phone: '03-1234-5678',
  language: 'ja' as const,
  productCategory: ['backpack' as const],
  quantity: '1500',
  desiredLeadTime: '90 日',
  quoteTerms: 'fob' as const,
  message: 'リュックの OEM を相談したいです。',
  privacyAgreed: true as const
}

describe('InquirySchema', () => {
  describe('单测', () => {
    it('完整合法输入通过', () => {
      expect(InquirySchema.safeParse(validInput).success).toBe(true)
    })

    it('缺 companyName 失败', () => {
      const r = InquirySchema.safeParse({ ...validInput, companyName: '' })
      expect(r.success).toBe(false)
    })

    it('email 格式错误失败', () => {
      const r = InquirySchema.safeParse({ ...validInput, email: 'not-an-email' })
      expect(r.success).toBe(false)
    })

    it('productCategory 空数组失败', () => {
      const r = InquirySchema.safeParse({ ...validInput, productCategory: [] })
      expect(r.success).toBe(false)
    })

    it('message 超过 500 字失败', () => {
      const r = InquirySchema.safeParse({ ...validInput, message: 'あ'.repeat(501) })
      expect(r.success).toBe(false)
    })

    it('privacyAgreed=false 失败', () => {
      const r = InquirySchema.safeParse({ ...validInput, privacyAgreed: false })
      expect(r.success).toBe(false)
    })

    it('phone / quantity / message 可空（选填）', () => {
      const r = InquirySchema.safeParse({
        ...validInput,
        phone: '',
        quantity: '',
        desiredLeadTime: '',
        message: ''
      })
      expect(r.success).toBe(true)
    })

    it('未知 language 失败', () => {
      const r = InquirySchema.safeParse({ ...validInput, language: 'fr' })
      expect(r.success).toBe(false)
    })
  })

  describe('property-based', () => {
    it('Property: email 字段任意字符串都返回布尔判断（不抛异常）', () => {
      fc.assert(
        fc.property(fc.string(), (email) => {
          const r = InquirySchema.safeParse({ ...validInput, email })
          expect(typeof r.success).toBe('boolean')
        }),
        { numRuns: 100 }
      )
    })

    it('Property: privacyAgreed 非 true 时始终失败', () => {
      fc.assert(
        fc.property(
          fc.oneof(fc.constant(false), fc.constant(undefined), fc.string(), fc.integer()),
          (v) => {
            const r = InquirySchema.safeParse({ ...validInput, privacyAgreed: v })
            expect(r.success).toBe(false)
          }
        ),
        { numRuns: 50 }
      )
    })

    it('Property: productCategory 任意合法品类子集（非空）都通过', () => {
      fc.assert(
        fc.property(
          fc
            .subarray([...PRODUCT_CATEGORIES], { minLength: 1 })
            .map((arr) => Array.from(new Set(arr))),
          (cats) => {
            const r = InquirySchema.safeParse({ ...validInput, productCategory: cats })
            expect(r.success).toBe(true)
          }
        ),
        { numRuns: 30 }
      )
    })

    it('Property: message ≤ 500 字始终通过长度校验', () => {
      fc.assert(
        fc.property(fc.string({ maxLength: 500 }), (msg) => {
          const r = InquirySchema.safeParse({ ...validInput, message: msg })
          expect(r.success).toBe(true)
        }),
        { numRuns: 50 }
      )
    })
  })
})
