import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { ARTICLES } from '@/lib/content/mock/articles'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  )
}))

import { NewsList } from './NewsList'

const messages = {
  pages: {
    news: {
      filterAll: 'すべて',
      categories: { announcement: 'お知らせ', column: 'コラム', diary: '工場日記' }
    }
  }
}

function wrap() {
  return render(
    <NextIntlClientProvider locale="ja" messages={messages}>
      <NewsList />
    </NextIntlClientProvider>
  )
}

describe('NewsList', () => {
  it('渲染全部文章（ja 标题）', () => {
    wrap()
    for (const a of ARTICLES) {
      expect(screen.getByText(a.title.ja)).toBeInTheDocument()
    }
  })

  it('分类筛选 tab 渲染（all + 3 类）', () => {
    wrap()
    expect(screen.getByRole('button', { name: 'すべて' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'コラム' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'お知らせ' })).toBeInTheDocument()
  })

  it('选「お知らせ」（无该类文章）后 column 文章隐藏', async () => {
    const user = userEvent.setup()
    wrap()
    const columnArticle = ARTICLES.find((a) => a.category === 'column')!
    expect(screen.getByText(columnArticle.title.ja)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'お知らせ' }))
    expect(screen.queryByText(columnArticle.title.ja)).not.toBeInTheDocument()
  })
})
