import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { TrustSection } from './TrustSection'

const messages = {
  home: {
    trust: {
      eyebrow: 'TRUSTED',
      title: '信頼',
      subtitle: '副文',
      mediaTitle: '掲載',
      customerTitle: '取引',
      certTitle: '認証',
      customers: {
        ec: 'EC 様',
        shosha: '商社様',
        select: 'セレクト様',
        indie: '独立様'
      },
      cert: { iso9001: 'ISO 9001', bsci: 'BSCI', sedex: 'SEDEX' }
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

describe('TrustSection', () => {
  it('section id="trust"', () => {
    const { container } = render(wrap(<TrustSection />))
    expect(container.querySelector('section#trust')).toBeInTheDocument()
  })

  it('渲染 3 个子标题（媒体 / 客户 / 认证）', () => {
    render(wrap(<TrustSection />))
    expect(screen.getByText('掲載')).toBeInTheDocument()
    expect(screen.getByText('取引')).toBeInTheDocument()
    expect(screen.getByText('認証')).toBeInTheDocument()
  })

  it('渲染 4 客户业种 + 3 认证名', () => {
    render(wrap(<TrustSection />))
    expect(screen.getByText('EC 様')).toBeInTheDocument()
    expect(screen.getByText('商社様')).toBeInTheDocument()
    expect(screen.getByText('セレクト様')).toBeInTheDocument()
    expect(screen.getByText('独立様')).toBeInTheDocument()
    // 认证名在图占位 + label 各出现 1 次
    expect(screen.getAllByText('ISO 9001').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('BSCI').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('SEDEX').length).toBeGreaterThanOrEqual(1)
  })
})
