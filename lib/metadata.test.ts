import { describe, it, expect } from 'vitest'
import { buildBaseMetadata } from './metadata'
import { LOCALES } from './i18n/config'

describe('buildBaseMetadata', () => {
  it.each(LOCALES)('locale=%s 时 Title ≤ 60 / Description ≤ 160 / hreflang 完整', (locale) => {
    const meta = buildBaseMetadata(locale)

    const title =
      typeof meta.title === 'object'
        ? (meta.title as { default: string }).default
        : (meta.title as string)
    expect(title).toBeTruthy()
    expect(title.length).toBeLessThanOrEqual(60)

    expect(meta.description).toBeTruthy()
    expect((meta.description as string).length).toBeLessThanOrEqual(160)

    const languages = meta.alternates?.languages ?? {}
    expect(Object.keys(languages)).toEqual(
      expect.arrayContaining(['ja', 'en', 'zh', 'x-default'])
    )
  })

  it('日文默认页 canonical 不带 locale 前缀', () => {
    const meta = buildBaseMetadata('ja')
    const canonical = meta.alternates?.canonical as string
    expect(canonical).toMatch(/^https?:\/\/[^/]+\/?$/)
  })

  it('英文页 canonical 带 /en 前缀', () => {
    const meta = buildBaseMetadata('en', { path: '/strength' })
    const canonical = meta.alternates?.canonical as string
    expect(canonical).toContain('/en/strength')
  })

  it('OpenGraph locale 正确映射', () => {
    expect(buildBaseMetadata('ja').openGraph?.locale).toBe('ja_JP')
    expect(buildBaseMetadata('en').openGraph?.locale).toBe('en_US')
    expect(buildBaseMetadata('zh').openGraph?.locale).toBe('zh_CN')
  })

  it('robots 默认允许索引和跟踪', () => {
    const meta = buildBaseMetadata('ja')
    expect(meta.robots).toMatchObject({ index: true, follow: true })
  })

  it('layout 调用（无 title）返回 title.template', () => {
    const meta = buildBaseMetadata('ja')
    expect(typeof meta.title).toBe('object')
    expect((meta.title as { template: string }).template).toContain('%s')
  })

  it('子页调用（有 title）返回纯字符串 title（无 template，避免叠加）', () => {
    const meta = buildBaseMetadata('ja', { path: '/strength', title: '当社の強み' })
    expect(meta.title).toBe('当社の強み')
  })

  it('子页 OG 标题含 siteName 后缀', () => {
    const meta = buildBaseMetadata('ja', { path: '/strength', title: '当社の強み' })
    expect(meta.openGraph?.title).toBe('当社の強み | 青島万翔輝')
  })

  it('注入动态 OG 图：/api/og + encode 后的 title + locale + 1200×630', () => {
    const meta = buildBaseMetadata('ja', { path: '/strength', title: '当社の強み' })
    const images = meta.openGraph?.images as Array<{
      url: string
      width: number
      height: number
    }>
    expect(images).toHaveLength(1)
    expect(images[0].url).toContain('/api/og')
    expect(images[0].url).toContain(`title=${encodeURIComponent('当社の強み')}`)
    expect(images[0].url).toContain('locale=ja')
    expect(images[0].width).toBe(1200)
    expect(images[0].height).toBe(630)
  })

  it('twitter 与 openGraph 共用 OG 图', () => {
    const meta = buildBaseMetadata('en', { path: '/works' })
    const twImages = meta.twitter?.images as Array<{ url: string }>
    expect(twImages[0].url).toContain('/api/og')
    expect(twImages[0].url).toContain('locale=en')
  })
})
