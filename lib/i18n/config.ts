export const LOCALES = ['ja', 'en', 'zh'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ja'

export const LOCALE_LABELS: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文'
}

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  ja: 'ja',
  en: 'en',
  zh: 'zh-Hans'
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
