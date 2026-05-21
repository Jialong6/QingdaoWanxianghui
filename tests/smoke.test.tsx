import { describe, it, expect } from 'vitest'
import { LOCALES, DEFAULT_LOCALE, isLocale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { buildAnimationClassName } from '@/lib/animation'
import { MAIN_NAV, NAVBAR_HEIGHT, SECTION_IDS } from '@/lib/navigation'

describe('M0 smoke tests', () => {
  it('locale 配置：默认 locale 是 ja，包含 ja/en/zh 三种', () => {
    expect(DEFAULT_LOCALE).toBe('ja')
    expect(LOCALES).toEqual(['ja', 'en', 'zh'])
  })

  it('isLocale 守卫：合法 / 非法 输入', () => {
    expect(isLocale('ja')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('zh')).toBe(true)
    expect(isLocale('fr')).toBe(false)
    expect(isLocale('')).toBe(false)
  })

  it('Metadata 生成：日文页 hreflang 完整 + Title ≤ 60 + Desc ≤ 160', () => {
    const meta = buildBaseMetadata('ja')
    const title = typeof meta.title === 'object' ? (meta.title as { default: string }).default : ''
    expect(title.length).toBeLessThanOrEqual(60)
    expect((meta.description as string).length).toBeLessThanOrEqual(160)

    const languages = meta.alternates?.languages
    expect(languages).toBeDefined()
    expect(Object.keys(languages ?? {})).toEqual(
      expect.arrayContaining(['ja', 'en', 'zh', 'x-default'])
    )
  })

  it('动效 helper：reducedMotion / disabled 时返回空类名', () => {
    expect(
      buildAnimationClassName({ variant: 'fade-in', isVisible: true, reducedMotion: true })
    ).toBe('')
    expect(buildAnimationClassName({ variant: 'fade-in', isVisible: true, disabled: true })).toBe(
      ''
    )
  })

  it('动效 helper：未进入视口时返回初始隐藏态', () => {
    const cls = buildAnimationClassName({ variant: 'fade-in-up', isVisible: false })
    expect(cls).toContain('opacity-0')
    expect(cls).toContain('transition-none')
  })

  it('动效 helper：可见时返回 animate-* 类', () => {
    expect(buildAnimationClassName({ variant: 'fade-in', isVisible: true })).toContain(
      'animate-fade-in'
    )
  })

  it('导航常量：主导航 7 项 + section 9 屏', () => {
    expect(MAIN_NAV).toHaveLength(7)
    expect(NAVBAR_HEIGHT).toBe(80)
    expect(SECTION_IDS).toHaveLength(9)
  })

  it('messages：三语 JSON 均能加载并含 hero.headline', async () => {
    const ja = (await import('@/messages/ja.json')).default
    const en = (await import('@/messages/en.json')).default
    const zh = (await import('@/messages/zh.json')).default
    expect(ja.home.hero.headline).toBeTruthy()
    expect(en.home.hero.headline).toBeTruthy()
    expect(zh.home.hero.headline).toBeTruthy()
  })
})
