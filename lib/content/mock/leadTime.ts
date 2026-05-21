/**
 * 納期と供給管理（plan.md §5.7）
 * 数据来源：knowledge base 04
 * 结构 + 语言中性数值；显示文案见 messages pages.leadTime.*
 */

/** 纳期工程阶段 id（文案 i18n: phases.{id}.label/duration/body） */
export const LEAD_PHASES = ['materials', 'warehouse', 'shipping', 'production'] as const
export type LeadPhaseId = (typeof LEAD_PHASES)[number]

/** 国内拠点（山東）急单最快开始交货天数 */
export const DOMESTIC_RUSH_DAYS = 30

/** 緬甸大貨 PP 確認後の標準量産月数 */
export const PRODUCTION_MONTHS = 3

/** 纳期变量 id（拼柜延迟 / 排产等待） */
export const LEAD_VARIABLES = ['consolidation', 'queue'] as const
export type LeadVariableId = (typeof LEAD_VARIABLES)[number]
