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

import { TripleCtaSection } from './TripleCtaSection'

const messages = {
  home: {
    cta: {
      eyebrow: 'NEXT',
      title: 'ご相談ください',
      subtitle: '副文',
      items: {
        inquiry: { title: 'A', desc: 'a', cta: 'A→' },
        catalog: { title: 'B', desc: 'b', cta: 'B→' },
        visit: { title: 'C', desc: 'c', cta: 'C→' }
      }
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

describe('TripleCtaSection', () => {
  it('section id="cta"', () => {
    const { container } = render(wrap(<TripleCtaSection />))
    expect(container.querySelector('section#cta')).toBeInTheDocument()
  })

  it('渲染 3 个 CTA 卡片', () => {
    render(wrap(<TripleCtaSection />))
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('3 个链接指向 /contact/inquiry /contact/catalog /contact/visit', () => {
    render(wrap(<TripleCtaSection />))
    expect(screen.getByText('A→').closest('a')).toHaveAttribute('href', '/contact/inquiry')
    expect(screen.getByText('B→').closest('a')).toHaveAttribute('href', '/contact/catalog')
    expect(screen.getByText('C→').closest('a')).toHaveAttribute('href', '/contact/visit')
  })
})
