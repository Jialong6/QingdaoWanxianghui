import { describe, it, expect, vi } from 'vitest'
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

import { LanguageSwitcher } from './LanguageSwitcher'

function wrap(locale: 'ja' | 'en' | 'zh', node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale={locale} messages={{}}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('LanguageSwitcher', () => {
  it('渲染 3 个 locale 链接', () => {
    render(wrap('ja', <LanguageSwitcher />))
    expect(screen.getByRole('link', { name: /日本語/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /English/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /中文/i })).toBeInTheDocument()
  })

  it('每个链接都指向当前路径（保留 pathname）', () => {
    render(wrap('ja', <LanguageSwitcher />))
    const links = screen.getAllByRole('link')
    for (const l of links) {
      expect(l.getAttribute('href')).toContain('/strength')
    }
  })

  it('当前 locale 标记为 aria-current="true"', () => {
    render(wrap('ja', <LanguageSwitcher />))
    const ja = screen.getByRole('link', { name: /日本語/i })
    expect(ja).toHaveAttribute('aria-current', 'true')
  })

  it('当前 locale 视觉高亮（带 primary 色类）', () => {
    render(wrap('en', <LanguageSwitcher />))
    const en = screen.getByRole('link', { name: /English/i })
    expect(en.className).toMatch(/text-primary/)
  })
})
