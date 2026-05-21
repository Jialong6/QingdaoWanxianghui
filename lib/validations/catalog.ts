import { z } from 'zod'

/** 业种（plan.md §5.13.3） */
export const INDUSTRIES = ['ec', 'shosha', 'select', 'brand', 'other'] as const
export type Industry = (typeof INDUSTRIES)[number]

/**
 * カタログ DL 表单（plan.md §5.13.3）
 * 字段：会社名 / 氏名 / メール / 業種 + 同意
 * 错误信息用稳定 code，组件层走 i18n（复用 inquiry.errors）
 */
export const CatalogSchema = z.object({
  companyName: z.string().trim().min(1, 'required').max(200, 'tooLong'),
  contactName: z.string().trim().min(1, 'required').max(100, 'tooLong'),
  email: z.string().trim().min(1, 'required').email('invalidEmail'),
  industry: z.enum(INDUSTRIES),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: 'mustAgree' }) })
})

export type CatalogInput = z.infer<typeof CatalogSchema>

export const CATALOG_DEFAULTS: Partial<CatalogInput> = {
  companyName: '',
  contactName: '',
  email: '',
  industry: 'ec'
}
