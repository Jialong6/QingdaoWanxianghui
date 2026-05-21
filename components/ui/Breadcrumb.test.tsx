import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

vi.mock('next/script', () => ({
  default: ({ children, ...props }: { children?: React.ReactNode; type?: string }) => (
    <script {...props}>{children}</script>
  )
}))

import { Breadcrumb } from './Breadcrumb'

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={{}}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('Breadcrumb', () => {
  const items = [
    { label: 'ホーム', href: '/' },
    { label: '会社案内', href: '/about' },
    { label: '代表挨拶' }
  ]

  it('渲染为 nav 元素 + aria-label="breadcrumb"', () => {
    render(wrap(<Breadcrumb items={items} />))
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb')
  })

  it('渲染所有 items 文字', () => {
    render(wrap(<Breadcrumb items={items} />))
    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('会社案内')).toBeInTheDocument()
    expect(screen.getByText('代表挨拶')).toBeInTheDocument()
  })

  it('当前页（最后一项，无 href）不渲染为链接', () => {
    render(wrap(<Breadcrumb items={items} />))
    expect(screen.queryByRole('link', { name: '代表挨拶' })).toBeNull()
  })

  it('当前页有 aria-current="page"', () => {
    render(wrap(<Breadcrumb items={items} />))
    expect(screen.getByText('代表挨拶')).toHaveAttribute('aria-current', 'page')
  })

  it('使用 › U+203A 作为分隔符', () => {
    const { container } = render(wrap(<Breadcrumb items={items} />))
    expect(container.textContent).toContain('›')
  })

  it('Schema.org 输出 BreadcrumbList JSON-LD', () => {
    const { container } = render(wrap(<Breadcrumb items={items} />))
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    const data = JSON.parse(script!.textContent ?? '{}')
    expect(data['@type']).toBe('BreadcrumbList')
    expect(data.itemListElement).toHaveLength(3)
  })
})
