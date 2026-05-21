import type { Locale } from './config'

/** 中文圈国家/地区代码（ISO 3166-1 alpha-2）→ zh */
const ZH_COUNTRIES = new Set(['CN', 'TW', 'HK', 'MO'])

/**
 * 国家代码 → 站点 locale（CLAUDE.md §4.5 第 9 条）
 * - 日 JP → ja
 * - 中文圈 CN/TW/HK/MO → zh
 * - 其余 / 未知 / null → en
 *
 * 纯函数，供 /api/geo、建议横幅共用。大小写不敏感。
 */
export function countryToLocale(countryCode: string | null | undefined): Locale {
  if (!countryCode) return 'en'
  const code = countryCode.trim().toUpperCase()
  if (code === 'JP') return 'ja'
  if (ZH_COUNTRIES.has(code)) return 'zh'
  return 'en'
}
