import type { HistoryEntry } from '@/lib/types'

/**
 * 会社概要 表格行（plan.md §5.10.1）
 * 值走 i18n（about.profile.{key}），含 XXX 占位
 */
export const PROFILE_ROWS = [
  'companyName',
  'founded',
  'representative',
  'locations',
  'staff',
  'business',
  'certifications'
] as const

export type ProfileRowKey = (typeof PROFILE_ROWS)[number]

/**
 * 沿革年表（plan.md §5.10.2）
 * XXX-各年具体里程碑待客户补充
 */
export const HISTORY: HistoryEntry[] = [
  { year: '2003', labelKey: 'founded' },
  { year: '2005', labelKey: 'firstClient' },
  { year: '2010', labelKey: 'milestone2010' },
  { year: '2015', labelKey: 'myanmarStart' },
  { year: '2020', labelKey: 'qingdaoExpand' },
  { year: '2026', labelKey: 'siteRenewal' }
]
