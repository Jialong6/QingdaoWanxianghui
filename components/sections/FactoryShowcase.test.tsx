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

import { FactoryShowcase } from './FactoryShowcase'

const messages = {
  home: {
    factory: {
      eyebrow: 'FACTORIES',
      title: '工場と設備',
      subtitle: '副文',
      viewMore: '工場詳細',
      items: {
        shandong: { name: '山東', subtitle: '国内' },
        myanmar: { name: '緬甸', subtitle: '海外' }
      },
      metrics: {
        area: '面積',
        staff: 'スタッフ',
        flatMachine: '平車',
        computerMachine: '電脳車',
        xrayMachine: 'X 線'
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

describe('FactoryShowcase', () => {
  it('section id="factory"', () => {
    const { container } = render(wrap(<FactoryShowcase />))
    expect(container.querySelector('section#factory')).toBeInTheDocument()
  })

  it('渲染两个工厂名 + 副标题', () => {
    render(wrap(<FactoryShowcase />))
    expect(screen.getByText('山東')).toBeInTheDocument()
    expect(screen.getByText('緬甸')).toBeInTheDocument()
    expect(screen.getByText('国内')).toBeInTheDocument()
    expect(screen.getByText('海外')).toBeInTheDocument()
  })

  it('「工場詳細」链接到 /factory', () => {
    render(wrap(<FactoryShowcase />))
    expect(screen.getByRole('link', { name: /工場詳細/ })).toHaveAttribute('href', '/factory')
  })
})
