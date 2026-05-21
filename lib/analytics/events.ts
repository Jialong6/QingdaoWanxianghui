import { readConsent } from './consent'

type EventParams = Record<string, unknown>

interface GtagWindow {
  dataLayer?: Array<Record<string, unknown>>
  gtag?: (...args: unknown[]) => void
}

/**
 * 上报分析事件（仅在已同意时生效，否则 no-op）
 * - GTM 路径：push 到 window.dataLayer
 * - GA4 gtag 路径：调用 window.gtag('event', ...)
 * 无脚本加载（dataLayer/gtag 不存在）时静默跳过，不抛错。
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  if (readConsent() !== 'granted') return

  const w = window as unknown as GtagWindow
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: name, ...params })
  }
  if (typeof w.gtag === 'function') {
    w.gtag('event', name, params)
  }
}
