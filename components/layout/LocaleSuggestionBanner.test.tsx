import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({
    href,
    locale,
    children,
    ...rest
  }: {
    href: string
    locale?: string
    children: React.ReactNode
  }) => (
    <a href={locale ? `/${locale}${href}` : href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/strength'
}))

let geo = {
  countryCode: null as string | null,
  countryName: null as string | null,
  isLoading: false,
  error: null as string | null
}
vi.mock('@/hooks/useGeoCountry', () => ({
  useGeoCountry: () => geo
}))

import { LocaleSuggestionBanner } from './LocaleSuggestionBanner'

const messages = {
  noticeBar: { dismiss: '閉じる' },
  localeSuggestion: {
    ja: '日本語でご覧になりたい場合はこちら',
    en: 'View this site in English',
    zh: '查看本站中文版'
  }
}

function wrap(locale: 'ja' | 'en' | 'zh', node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('LocaleSuggestionBanner', () => {
  beforeEach(() => {
    localStorage.clear()
    geo = { countryCode: null, countryName: null, isLoading: false, error: null }
  })

  it('日本 IP 在英文页 → 显示日本語切换链接', () => {
    geo = { ...geo, countryCode: 'JP' }
    render(wrap('en', <LocaleSuggestionBanner />))
    const link = screen.getByRole('link', { name: '日本語でご覧になりたい場合はこちら' })
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('/ja/strength')
  })

  it('日本 IP 在日文页（推断=当前）→ 不渲染', () => {
    geo = { ...geo, countryCode: 'JP' }
    const { container } = render(wrap('ja', <LocaleSuggestionBanner />))
    expect(container).toBeEmptyDOMElement()
  })

  it('中国 IP 在日文页 → 显示中文切换链接', () => {
    geo = { ...geo, countryCode: 'CN' }
    render(wrap('ja', <LocaleSuggestionBanner />))
    expect(screen.getByRole('link', { name: '查看本站中文版' })).toBeInTheDocument()
  })

  it('未检测到国家（countryCode=null）→ 不渲染（不打扰）', () => {
    geo = { ...geo, countryCode: null }
    const { container } = render(wrap('ja', <LocaleSuggestionBanner />))
    expect(container).toBeEmptyDOMElement()
  })

  it('加载中 → 不渲染', () => {
    geo = { ...geo, countryCode: 'CN', isLoading: true }
    const { container } = render(wrap('ja', <LocaleSuggestionBanner />))
    expect(container).toBeEmptyDOMElement()
  })
})
