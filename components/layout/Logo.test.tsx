import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}))

import { vi } from 'vitest'
import { Logo } from './Logo'

const messages = {
  meta: {
    siteName: '青島万翔輝',
    siteTagline: 'どこまでも、現場であること。',
    siteSubTagline: '中国と緬甸から、日本品質のバッグを。'
  }
}

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={messages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('Logo', () => {
  it('渲染站点名称', () => {
    render(wrap(<Logo />))
    expect(screen.getByText('青島万翔輝')).toBeInTheDocument()
  })

  it('指向首页 /', () => {
    render(wrap(<Logo />))
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('size=lg 应用大字号类', () => {
    render(wrap(<Logo size="lg" />))
    expect(screen.getByRole('link').className).toMatch(/text-xl|text-2xl/)
  })

  it('variant=light 用浅色文字（用于深色 footer）', () => {
    render(wrap(<Logo variant="light" />))
    expect(screen.getByRole('link').className).toMatch(/text-neutral-0|text-neutral-50/)
  })

  it('aria-label 包含站点名', () => {
    render(wrap(<Logo />))
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', expect.stringContaining('青島万翔輝'))
  })
})
