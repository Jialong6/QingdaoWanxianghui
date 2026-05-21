import { z } from 'zod'
import { PRODUCT_CATEGORIES } from '@/lib/validations/inquiry'

/**
 * サンプル依頼 表单（plan.md §5.13.5）
 * 复用 inquiry 的 PRODUCT_CATEGORIES。错误信息用稳定 code（复用 inquiry.errors）
 */
export const SampleSchema = z.object({
  companyName: z.string().trim().min(1, 'required').max(200, 'tooLong'),
  contactName: z.string().trim().min(1, 'required').max(100, 'tooLong'),
  email: z.string().trim().min(1, 'required').email('invalidEmail'),
  productCategory: z.array(z.enum(PRODUCT_CATEGORIES)).min(1, 'selectAtLeastOne'),
  quantity: z.string().trim().max(100, 'tooLong').optional().or(z.literal('')),
  shippingAddress: z.string().trim().min(1, 'required').max(300, 'tooLong'),
  attachments: z
    .array(z.object({ name: z.string(), size: z.number(), type: z.string() }))
    .max(5, 'tooManyFiles')
    .optional(),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: 'mustAgree' }) })
})

export type SampleInput = z.infer<typeof SampleSchema>

export const SAMPLE_DEFAULTS: Partial<SampleInput> = {
  companyName: '',
  contactName: '',
  email: '',
  productCategory: [],
  quantity: '',
  shippingAddress: ''
}
