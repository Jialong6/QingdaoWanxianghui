import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}))

import { HeroBanner } from './HeroBanner'

const messages = {
  home: {
    hero: {
      eyebrow: 'BAG OEM/ODM FACTORY',
      headline: 'どこまでも、現場であること。',
      subheadline: '副文',
      primaryCta: 'お問い合わせ',
      secondaryCta: 'カタログをダウンロード',
      imageAlt: '工場現場'
    }
  }
}

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={messages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('HeroBanner', () => {
  it('渲染 section 含 id="hero"', () => {
    const { container } = render(wrap(<HeroBanner />))
    expect(container.querySelector('section#hero')).toBeInTheDocument()
  })

  it('渲染 H1 大标题', () => {
    render(wrap(<HeroBanner />))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'どこまでも、現場であること。'
    )
  })

  it('渲染 eyebrow + subheadline', () => {
    render(wrap(<HeroBanner />))
    expect(screen.getByText('BAG OEM/ODM FACTORY')).toBeInTheDocument()
    expect(screen.getByText('副文')).toBeInTheDocument()
  })

  it('双 CTA 链接到 /contact/inquiry + /contact/catalog', () => {
    render(wrap(<HeroBanner />))
    expect(screen.getByText('お問い合わせ').closest('a')).toHaveAttribute(
      'href',
      '/contact/inquiry'
    )
    expect(
      screen.getByText('カタログをダウンロード').closest('a')
    ).toHaveAttribute('href', '/contact/catalog')
  })

  it('Hero 大图含 alt 文字', () => {
    render(wrap(<HeroBanner />))
    expect(screen.getByAltText('工場現場')).toBeInTheDocument()
  })
})
