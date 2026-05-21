/**
 * 商務条件（plan.md §5.8）
 * 数据来源：knowledge base 06
 * 结构 + 语言中性数值；显示文案见 messages pages.commercial.*
 */

/** 取引条件 id（FOB 仰光 / FOB 青島 / CIF） */
export const TRADE_TERMS = ['fobYangon', 'fobQingdao', 'cif'] as const
export type TradeTermId = (typeof TRADE_TERMS)[number]

/** 決済条件 id（新規 T/T 30+70 / 長期 1週 T/T / L/C） */
export const PAYMENT_TERMS = ['newClient', 'longTerm', 'lc'] as const
export type PaymentTermId = (typeof PAYMENT_TERMS)[number]

/** 最小ロット（国内：数百〜数万、文案 i18n；緬甸：単款単色 1,500 個以上） */
export const MOQ = { myanmarMin: 1500 } as const

/** 新規取引の T/T 比率（前金 % / 残金 %） */
export const TT_DEPOSIT_PERCENT = 30
export const TT_BALANCE_PERCENT = 70
