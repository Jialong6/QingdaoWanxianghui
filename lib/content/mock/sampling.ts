/**
 * サンプリング（打样）（plan.md §5.9）
 * 数据来源：knowledge base 05
 * 结构 + 语言中性数值；显示文案见 messages pages.sampling.*
 */

/** 打样流程步骤 id（見積 → 順番待ち → 初サンプル → 修正） */
export const SAMPLING_STEPS = ['quote', 'queue', 'firstSample', 'revision'] as const
export type SamplingStepId = (typeof SAMPLING_STEPS)[number]

/** 排入计划后首样制作天数 */
export const FIRST_SAMPLE_DAYS = 7

/** 通常对应的修改次数上限 */
export const REVISION_ROUNDS = 2

/** 补充说明 id（費用 XXX 待客户 / 高意図のお願い，软性不绝对化表述） */
export const SAMPLING_NOTES = ['fee', 'intent'] as const
export type SamplingNoteId = (typeof SAMPLING_NOTES)[number]
