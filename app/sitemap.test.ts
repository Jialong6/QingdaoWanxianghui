import { describe, it, expect } from 'vitest'
import sitemap from './sitemap'
import { allRoutes } from '@/lib/routes'
import { LOCALES } from '@/lib/i18n/config'

describe('sitemap', () => {
  const entries = sitemap()

  it('每条路由 × 3 locale', () => {
    expect(entries.length).toBe(allRoutes().length * LOCALES.length)
  })

  it('url 唯一无重复', () => {
    const urls = entries.map((e) => e.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('所有 url 合法（http(s) 开头）', () => {
    expect(entries.every((e) => /^https?:\/\//.test(e.url))).toBe(true)
  })

  it('默认 locale（ja）首页无前缀', () => {
    const home = entries.find((e) => /\/$|3000$/.test(e.url) && !e.url.includes('/en') && !e.url.includes('/zh'))
    expect(home).toBeDefined()
    expect(home?.priority).toBe(1)
  })

  it('每条含 hreflang alternates（ja/en/zh）', () => {
    const langs = entries[0].alternates?.languages ?? {}
    expect(Object.keys(langs)).toEqual(expect.arrayContaining(['ja', 'en', 'zh']))
  })

  it('包含案例详情路由', () => {
    expect(entries.some((e) => e.url.includes('/works/case01'))).toBe(true)
  })
})
