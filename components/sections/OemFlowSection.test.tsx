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

import { OemFlowSection } from './OemFlowSection'

const messages = {
  home: {
    oemFlow: {
      eyebrow: 'OEM',
      title: 'OEM の流れ',
      subtitle: '副文',
      viewMore: '工程を見る',
      items: {
        inquiry: { name: 'A', duration: 'a' },
        hearing: { name: 'B', duration: 'b' },
        quote: { name: 'C', duration: 'c' },
        sampling: { name: 'D', duration: 'd' },
        ppSample: { name: 'E', duration: 'e' },
        production: { name: 'F', duration: 'f' },
        shipping: { name: 'G', duration: 'g' }
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

describe('OemFlowSection', () => {
  it('section id="oem-flow"', () => {
    const { container } = render(wrap(<OemFlowSection />))
    expect(container.querySelector('section#oem-flow')).toBeInTheDocument()
  })

  it('渲染 7 步', () => {
    render(wrap(<OemFlowSection />))
    for (const n of ['A', 'B', 'C', 'D', 'E', 'F', 'G']) {
      expect(screen.getByText(n)).toBeInTheDocument()
    }
  })

  it('「工程を見る」链接到 /oem-flow', () => {
    render(wrap(<OemFlowSection />))
    expect(screen.getByRole('link', { name: /工程を見る/ })).toHaveAttribute(
      'href',
      '/oem-flow'
    )
  })
})
