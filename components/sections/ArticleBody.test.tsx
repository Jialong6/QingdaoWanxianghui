import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleBody } from './ArticleBody'
import type { Block } from '@/lib/content/mock/articles'

const blocks: Block[] = [
  { type: 'h2', text: { ja: '見出し', en: 'Heading', zh: '标题' } },
  { type: 'p', text: { ja: '本文です', en: 'Body text', zh: '正文' } },
  { type: 'ul', items: { ja: ['項目1', '項目2'], en: ['Item1', 'Item2'], zh: ['条目1', '条目2'] } }
]

describe('ArticleBody', () => {
  it('按 locale 渲染 h2 / p / ul', () => {
    render(<ArticleBody blocks={blocks} locale="ja" />)
    expect(screen.getByRole('heading', { name: '見出し' })).toBeInTheDocument()
    expect(screen.getByText('本文です')).toBeInTheDocument()
    expect(screen.getByText('項目1')).toBeInTheDocument()
    expect(screen.getByText('項目2')).toBeInTheDocument()
  })

  it('切换 locale 取对应语言文案', () => {
    render(<ArticleBody blocks={blocks} locale="en" />)
    expect(screen.getByRole('heading', { name: 'Heading' })).toBeInTheDocument()
    expect(screen.getByText('Body text')).toBeInTheDocument()
    expect(screen.getByText('Item2')).toBeInTheDocument()
  })

  it('ul 渲染为列表项', () => {
    const { container } = render(<ArticleBody blocks={blocks} locale="zh" />)
    expect(container.querySelectorAll('li')).toHaveLength(2)
  })
})
