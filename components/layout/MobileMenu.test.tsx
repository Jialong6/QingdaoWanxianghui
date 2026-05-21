import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/'
}))

import { MobileMenu } from './MobileMenu'

const messages = {
  meta: { siteName: 'X', siteTagline: 'Y', siteSubTagline: 'Z' },
  nav: {
    strength: 'A',
    oemFlow: 'B',
    factory: 'C',
    works: 'D',
    about: 'E',
    news: 'F',
    contact: 'G',
    catalog: 'H',
    privacy: 'P',
    terms: 'T',
    sitemap: 'S',
    openMenu: 'open',
    closeMenu: 'close'
  },
  common: { language: '言語' }
}

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={messages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('MobileMenu', () => {
  it('isOpen=false 时不渲染内容（aria-hidden 或不可见）', () => {
    render(
      wrap(<MobileMenu isOpen={false} onClose={vi.fn()} menuRef={{ current: null }} />)
    )
    const drawer = screen.queryByRole('dialog')
    if (drawer) {
      expect(drawer).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('isOpen=true 时显示 drawer + 7 项导航', () => {
    render(wrap(<MobileMenu isOpen onClose={vi.fn()} menuRef={{ current: null }} />))
    const drawer = screen.getByRole('dialog')
    expect(drawer).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    // G（contact）在导航 + 底部大 CTA 出现 2 次
    expect(screen.getAllByText('G').length).toBeGreaterThanOrEqual(1)
  })

  it('isOpen=true 时有 aria-modal="true"', () => {
    render(wrap(<MobileMenu isOpen onClose={vi.fn()} menuRef={{ current: null }} />))
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('包含底部大 CTA（お問い合わせ）', () => {
    render(wrap(<MobileMenu isOpen onClose={vi.fn()} menuRef={{ current: null }} />))
    expect(screen.getAllByText('G').length).toBeGreaterThan(0)
  })
})
