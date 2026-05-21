/**
 * 品質と検品体制（plan.md §5.6）
 * 数据来源：knowledge base 01 + 02
 * 结构 + 语言中性数值；显示文案见 messages pages.quality.*
 */

/** 二段検品 + X 線 + 第三者監査 流程步骤 id（文案 i18n: steps.{id}.label/body） */
export const INSPECTION_STEPS = ['ipqc', 'oqc', 'xray', 'audit'] as const
export type InspectionStepId = (typeof INSPECTION_STEPS)[number]

/** 品质管控手段 id（工艺单 / 用量表 / 首件确认） */
export const QC_METHODS = ['processSheet', 'materialList', 'firstPiece'] as const
export type QcMethodId = (typeof QC_METHODS)[number]

/** X 線検針機 配備台数（knowledge base 02：山東 1 / 緬甸 2） */
export const XRAY_UNITS = { china: 1, myanmar: 2 } as const

/** 認証・監査（XXX: BSCI/SEDEX/ISO 確認中、可出具范围待客户确认） */
export const CERTIFICATIONS = ['bsci', 'sedex', 'iso'] as const
export type CertificationId = (typeof CERTIFICATIONS)[number]
