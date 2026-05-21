import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/'
}))

vi.mock('@/hooks/useNavigation', () => ({
  useScrollState: vi.fn(() => false),
  useMobileMenu: vi.fn(() => ({
    isOpen: false,
    toggle: vi.fn(),
    close: vi.fn(),
    menuRef: { current: null }
  }))
}))

import { Navbar } from './Navbar'
import { useScrollState, useMobileMenu } from '@/hooks/useNavigation'

const messages = {
  meta: {
    siteName: '青島万翔輝',
    siteTagline: 'どこまでも、現場であること。',
    siteSubTagline: 'X'
  },
  nav: {
    strength: '当社の強み',
    oemFlow: 'OEM の流れ',
    factory: '工場と設備',
    works: '制作事例',
    about: '会社案内',
    news: 'お知らせ',
    contact: 'お問い合わせ',
    catalog: 'カタログ DL',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる'
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

describe('Navbar', () => {
  it('渲染为 header 元素 + 7 项主导航（桌面 + 移动 drawer 都含）', () => {
    render(wrap(<Navbar />))
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    // 桌面主导航 + 移动 drawer 都渲染，所以每项至少 1 个
    expect(screen.getAllByText('当社の強み').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('OEM の流れ').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('工場と設備').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('制作事例').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('会社案内').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('お知らせ').length).toBeGreaterThanOrEqual(1)
  })

  it('包含 Logo 链接', () => {
    render(wrap(<Navbar />))
    expect(screen.getByText('青島万翔輝')).toBeInTheDocument()
  })

  it('双 CTA：お問い合わせ + カタログ DL（桌面端可见）', () => {
    render(wrap(<Navbar />))
    const ctas = screen.getAllByText(/お問い合わせ|カタログ/)
    expect(ctas.length).toBeGreaterThanOrEqual(2)
  })

  it('滚动 >32px 时背景半透明 + backdrop-blur', () => {
    vi.mocked(useScrollState).mockReturnValueOnce(true)
    render(wrap(<Navbar />))
    expect(screen.getByRole('banner').className).toMatch(/backdrop-blur/)
  })

  it('未滚动时使用默认背景', () => {
    vi.mocked(useScrollState).mockReturnValueOnce(false)
    render(wrap(<Navbar />))
    expect(screen.getByRole('banner').className).toMatch(/bg-neutral-0/)
  })

  it('点击 hamburger 按钮调用 toggle', async () => {
    const user = userEvent.setup()
    const toggle = vi.fn()
    vi.mocked(useMobileMenu).mockReturnValueOnce({
      isOpen: false,
      toggle,
      close: vi.fn(),
      menuRef: { current: null }
    })
    const { container } = render(wrap(<Navbar />))
    // hamburger 通过 aria-controls 唯一定位
    const burger = container.querySelector('button[aria-controls="mobile-menu"]')
    expect(burger).toBeInTheDocument()
    await user.click(burger as HTMLElement)
    expect(toggle).toHaveBeenCalled()
  })
})
