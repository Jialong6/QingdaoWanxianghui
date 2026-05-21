/** 分析同意状态的 localStorage key */
export const CONSENT_KEY = 'consent:analytics'

/** 同意状态：granted=允许 / denied=拒绝 / null=未决定 */
export type ConsentValue = 'granted' | 'denied' | null

/**
 * 读取分析同意状态（SSR 安全；非法/缺失回退 null）
 */
export function readConsent(): ConsentValue {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(CONSENT_KEY)
  return raw === 'granted' || raw === 'denied' ? raw : null
}

/**
 * 写入分析同意状态（SSR 安全）
 */
export function writeConsent(value: Exclude<ConsentValue, null>): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, value)
}
