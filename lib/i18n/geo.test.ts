import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { countryToLocale } from './geo'
import { LOCALES, type Locale } from './config'

describe('countryToLocale', () => {
  it('日本 JP → ja', () => {
    expect(countryToLocale('JP')).toBe('ja')
  })

  it('中文圈 CN/TW/HK/MO → zh', () => {
    expect(countryToLocale('CN')).toBe('zh')
    expect(countryToLocale('TW')).toBe('zh')
    expect(countryToLocale('HK')).toBe('zh')
    expect(countryToLocale('MO')).toBe('zh')
  })

  it('其他国家 → en', () => {
    expect(countryToLocale('US')).toBe('en')
    expect(countryToLocale('DE')).toBe('en')
    expect(countryToLocale('KR')).toBe('en')
  })

  it('null / undefined / 空 → en（兜底）', () => {
    expect(countryToLocale(null)).toBe('en')
    expect(countryToLocale(undefined)).toBe('en')
    expect(countryToLocale('')).toBe('en')
  })

  it('大小写不敏感', () => {
    expect(countryToLocale('jp')).toBe('ja')
    expect(countryToLocale('cn')).toBe('zh')
  })

  it('Property: 任意字符串输入恒返回合法 Locale', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = countryToLocale(input)
        expect(LOCALES as readonly Locale[]).toContain(result)
      }),
      { numRuns: 200 }
    )
  })
})
