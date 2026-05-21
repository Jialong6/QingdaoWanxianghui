import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { parseOgParams, clampTitle, OG_TITLE_MAX, OG_BRAND } from './og'
import { LOCALES } from './i18n/config'

describe('clampTitle', () => {
  it('短标题原样返回（去首尾空格）', () => {
    expect(clampTitle('  当社の強み  ')).toBe('当社の強み')
  })

  it('超长标题截断到 OG_TITLE_MAX 并加省略号', () => {
    const long = 'あ'.repeat(100)
    const out = clampTitle(long)
    expect(out.length).toBe(OG_TITLE_MAX)
    expect(out.endsWith('…')).toBe(true)
  })

  it('Property: 任意输入长度恒 ≤ OG_TITLE_MAX', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        expect(clampTitle(s).length).toBeLessThanOrEqual(OG_TITLE_MAX)
      }),
      { numRuns: 200 }
    )
  })
})

describe('parseOgParams', () => {
  it('正常 title + locale', () => {
    const out = parseOgParams(new URLSearchParams('title=当社の強み&locale=ja'))
    expect(out).toEqual({ title: '当社の強み', locale: 'ja' })
  })

  it('locale 非法 → 回退 ja', () => {
    expect(parseOgParams(new URLSearchParams('locale=fr')).locale).toBe('ja')
    expect(parseOgParams(new URLSearchParams('')).locale).toBe('ja')
  })

  it('title 缺省 → 用该 locale 品牌字标', () => {
    expect(parseOgParams(new URLSearchParams('locale=en')).title).toBe(OG_BRAND.en)
    expect(parseOgParams(new URLSearchParams('title=&locale=zh')).title).toBe(OG_BRAND.zh)
  })

  it('Property: locale 恒合法、title 恒非空且 ≤ OG_TITLE_MAX', () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (title, locale) => {
        const params = new URLSearchParams()
        if (title) params.set('title', title)
        if (locale) params.set('locale', locale)
        const out = parseOgParams(params)
        expect(LOCALES as readonly string[]).toContain(out.locale)
        expect(out.title.length).toBeGreaterThan(0)
        expect(out.title.length).toBeLessThanOrEqual(OG_TITLE_MAX)
      }),
      { numRuns: 200 }
    )
  })
})
