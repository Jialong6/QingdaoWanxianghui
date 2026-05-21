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

import { WorksPreview } from './WorksPreview'

const items = Object.fromEntries(
  Array.from({ length: 12 }, (_, i) => [
    `case${String(i + 1).padStart(2, '0')}`,
    { title: `Case ${i + 1}` }
  ])
)

const messages = {
  home: {
    works: {
      eyebrow: 'WORKS',
      title: '制作事例',
      subtitle: '副文',
      viewMore: '全部見る',
      items,
      tags: {
        qty: '{n} 個',
        qtySample: 'サンプル',
        days: '{n} 日',
        qingdao: '青島',
        shandong: '山東',
        myanmar: '緬甸'
      },
      category: {
        backpack: 'リュック',
        tote: 'トート',
        business: 'ビジネス',
        student: '学生用',
        other: 'その他'
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

describe('WorksPreview', () => {
  it('section id="works"', () => {
    const { container } = render(wrap(<WorksPreview />))
    expect(container.querySelector('section#works')).toBeInTheDocument()
  })

  it('渲染 12 个案例标题', () => {
    render(wrap(<WorksPreview />))
    expect(screen.getByText('Case 1')).toBeInTheDocument()
    expect(screen.getByText('Case 12')).toBeInTheDocument()
  })

  it('「全部見る」链接到 /works', () => {
    render(wrap(<WorksPreview />))
    expect(screen.getByRole('link', { name: /全部見る/ })).toHaveAttribute('href', '/works')
  })
})
