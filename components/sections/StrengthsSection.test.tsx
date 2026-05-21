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

import { StrengthsSection } from './StrengthsSection'

const messages = {
  home: {
    strengths: {
      eyebrow: 'OUR STRENGTHS',
      title: '5 つの強み',
      subtitle: '副文案',
      viewMore: '詳しく見る',
      items: {
        dualFactory: { title: 'A1', desc: 'A2' },
        sampling: { title: 'B1', desc: 'B2' },
        quality: { title: 'C1', desc: 'C2' },
        experience: { title: 'D1', desc: 'D2' },
        commercial: { title: 'E1', desc: 'E2' }
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

describe('StrengthsSection', () => {
  it('section id="strengths"', () => {
    const { container } = render(wrap(<StrengthsSection />))
    expect(container.querySelector('section#strengths')).toBeInTheDocument()
  })

  it('渲染 5 个强项标题', () => {
    render(wrap(<StrengthsSection />))
    expect(screen.getByText('A1')).toBeInTheDocument()
    expect(screen.getByText('B1')).toBeInTheDocument()
    expect(screen.getByText('C1')).toBeInTheDocument()
    expect(screen.getByText('D1')).toBeInTheDocument()
    expect(screen.getByText('E1')).toBeInTheDocument()
  })

  it('「詳しく見る」链接到 /strength', () => {
    render(wrap(<StrengthsSection />))
    const link = screen.getByRole('link', { name: /詳しく見る/ })
    expect(link).toHaveAttribute('href', '/strength')
  })
})
