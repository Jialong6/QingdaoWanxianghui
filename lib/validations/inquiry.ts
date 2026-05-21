import { z } from 'zod'

/** 产品品类（plan.md §5.13.2） */
export const PRODUCT_CATEGORIES = ['backpack', 'tote', 'business', 'student', 'other'] as const
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

/** 报价条件 */
export const QUOTE_TERMS = ['fob', 'cif', 'undecided'] as const
export type QuoteTerm = (typeof QUOTE_TERMS)[number]

/** 询盘语言 */
export const INQUIRY_LANGUAGES = ['ja', 'zh', 'en'] as const

/**
 * 询盘表单 Zod schema（plan.md §5.13.2）
 * - 错误信息使用稳定的 message code，组件层用 i18n 翻译
 * - 文件上传字段本阶段不含（M5.5）
 */
export const InquirySchema = z.object({
  companyName: z.string().trim().min(1, 'required').max(200, 'tooLong'),
  contactName: z.string().trim().min(1, 'required').max(100, 'tooLong'),
  email: z.string().trim().min(1, 'required').email('invalidEmail'),
  phone: z.string().trim().max(50, 'tooLong').optional().or(z.literal('')),
  language: z.enum(INQUIRY_LANGUAGES),
  productCategory: z
    .array(z.enum(PRODUCT_CATEGORIES))
    .min(1, 'selectAtLeastOne'),
  quantity: z.string().trim().max(100, 'tooLong').optional().or(z.literal('')),
  desiredLeadTime: z.string().trim().max(100, 'tooLong').optional().or(z.literal('')),
  quoteTerms: z.enum(QUOTE_TERMS),
  message: z.string().trim().max(500, 'tooLong').optional().or(z.literal('')),
  attachments: z
    .array(z.object({ name: z.string(), size: z.number(), type: z.string() }))
    .max(5, 'tooManyFiles')
    .optional(),
  privacyAgreed: z.literal(true, {
    errorMap: () => ({ message: 'mustAgree' })
  })
})

export type InquiryInput = z.infer<typeof InquirySchema>

/** 表单默认值 */
export const INQUIRY_DEFAULTS: Partial<InquiryInput> = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  language: 'ja',
  productCategory: [],
  quantity: '',
  desiredLeadTime: '',
  quoteTerms: 'undecided',
  message: ''
}
