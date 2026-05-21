/**
 * よくある質問（plan.md §5.12）：6 类 ≥15 问答
 * 数据来源：knowledge base 04/05/06 + plan §5.12
 * 结构（分类 + 条目 id）；问答文案见 messages pages.faq.q/a.{category}.{item}
 */

export interface FaqCategory {
  /** 分类 id（文案 i18n: cat.{id}） */
  id: string
  /** 该类下问题 id（文案 i18n: q.{id}.{item} / a.{id}.{item}） */
  items: readonly string[]
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  { id: 'oem', items: ['moq', 'revision', 'design'] },
  { id: 'leadTime', items: ['standard', 'rush'] },
  { id: 'price', items: ['payment', 'terms', 'currency'] },
  { id: 'visit', items: ['booking', 'myanmar', 'sites'] },
  { id: 'quality', items: ['xray', 'audit'] },
  { id: 'logistics', items: ['route', 'sourcing'] }
] as const

/** 扁平化为 {category,item} 列表（供 FAQPage schema 与遍历） */
export function faqFlatItems(): Array<{ category: string; item: string }> {
  return FAQ_CATEGORIES.flatMap((c) => c.items.map((item) => ({ category: c.id, item })))
}
