import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  LOCALE_HTML_LANG,
  isLocale
} from './config'

describe('i18n config', () => {
  it('LOCALES 包含 ja/en/zh 且 ja 排第一', () => {
    expect(LOCALES).toEqual(['ja', 'en', 'zh'])
  })

  it('默认 locale 是 ja', () => {
    expect(DEFAULT_LOCALE).toBe('ja')
  })

  it('每个 locale 都有 label 和 html-lang 映射', () => {
    for (const locale of LOCALES) {
      expect(LOCALE_LABELS[locale]).toBeTruthy()
      expect(LOCALE_HTML_LANG[locale]).toBeTruthy()
    }
  })

  it('isLocale 守卫合法 locale', () => {
    expect(isLocale('ja')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('zh')).toBe(true)
  })

  it('isLocale 拒绝非法 locale', () => {
    expect(isLocale('fr')).toBe(false)
    expect(isLocale('JA')).toBe(false)
    expect(isLocale('')).toBe(false)
    expect(isLocale('ja-JP')).toBe(false)
  })

  it('Property: isLocale 对任意非 LOCALES 字符串返回 false', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        if ((LOCALES as readonly string[]).includes(s)) return
        expect(isLocale(s)).toBe(false)
      }),
      { numRuns: 100 }
    )
  })
})
