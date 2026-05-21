import { z } from 'zod'

/** 见学拠点 */
export const VISIT_SITES = ['qingdao', 'shandong', 'myanmar'] as const
export type VisitSite = (typeof VISIT_SITES)[number]

/** 通译需求 */
export const TRANSLATION_OPTIONS = ['none', 'ja', 'en', 'zh'] as const

/**
 * 工場見学申込 表单（plan.md §5.13.4）
 * 错误信息用稳定 code，组件层走 i18n（复用 inquiry.errors）
 */
export const VisitSchema = z.object({
  companyName: z.string().trim().min(1, 'required').max(200, 'tooLong'),
  contactName: z.string().trim().min(1, 'required').max(100, 'tooLong'),
  email: z.string().trim().min(1, 'required').email('invalidEmail'),
  sites: z.array(z.enum(VISIT_SITES)).min(1, 'selectAtLeastOne'),
  preferredDate: z.string().trim().max(200, 'tooLong').optional().or(z.literal('')),
  companions: z.string().trim().max(50, 'tooLong').optional().or(z.literal('')),
  translation: z.enum(TRANSLATION_OPTIONS),
  airportPickup: z.boolean(),
  message: z.string().trim().max(500, 'tooLong').optional().or(z.literal('')),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: 'mustAgree' }) })
})

export type VisitInput = z.infer<typeof VisitSchema>

export const VISIT_DEFAULTS: Partial<VisitInput> = {
  companyName: '',
  contactName: '',
  email: '',
  sites: [],
  preferredDate: '',
  companions: '',
  translation: 'none',
  airportPickup: false,
  message: ''
}
