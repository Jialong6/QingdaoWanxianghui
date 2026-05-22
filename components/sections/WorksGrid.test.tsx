import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { WORKS } from '@/lib/content/mock/works'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  )
}))

import { WorksGrid } from './WorksGrid'

// 24 个真实案例 title 占位（避免 next-intl 缺键）
const items = Object.fromEntries(WORKS.map((w) => [w.id, { title: `T-${w.id}` }]))

const messages = {
  home: {
    works: {
      items,
      category: {
        backpack: 'リュック',
        tote: 'トート',
        business: 'ビジネス',
        student: '学生用',
        other: 'その他'
      },
      scene: {
        commute: '通勤',
        business: '出張',
        school: '通学',
        outdoor: 'アウトドア',
        travel: '旅行'
      },
      material: {
        nylon: 'ナイロン',
        polyester: 'ポリエステル',
        canvas: 'キャンバス',
        recycled: 'リサイクル',
        leather: '合成皮革'
      },
      tags: {
        qty: '{n} 個',
        qtySample: 'サンプル',
        days: '{n} 日',
        qingdao: '青島打样',
        shandong: '山東',
        myanmar: '緬甸'
      }
    }
  },
  pages: {
    works: {
      filterAll: 'すべて',
      filterCategoryLabel: '品類',
      filterSceneLabel: '用途',
      filterFactoryLabel: '生産拠点',
      filterMaterialLabel: '素材',
      filterReset: 'リセット',
      resultCount: '{n} 件',
      noResults: '該当する事例がありません'
    }
  }
}

function wrap() {
  return render(
    <NextIntlClientProvider locale="ja" messages={messages}>
      <WorksGrid />
    </NextIntlClientProvider>
  )
}

describe('WorksGrid 多维筛选', () => {
  it('渲染 4 个筛选维度的 label', () => {
    wrap()
    expect(screen.getByText('品類')).toBeInTheDocument()
    expect(screen.getByText('用途')).toBeInTheDocument()
    expect(screen.getByText('生産拠点')).toBeInTheDocument()
    expect(screen.getByText('素材')).toBeInTheDocument()
  })

  it('默认渲染全部 24 案例', () => {
    wrap()
    expect(screen.getByText('T-case01')).toBeInTheDocument()
    expect(screen.getByText('T-case24')).toBeInTheDocument()
  })

  it('品类筛选（学生用）隐藏背包案例', async () => {
    const user = userEvent.setup()
    wrap()
    await user.click(screen.getByRole('button', { name: '学生用' }))
    expect(screen.queryByText('T-case01')).not.toBeInTheDocument() // backpack
    expect(screen.getByText('T-case04')).toBeInTheDocument() // student
  })

  it('品类 × 拠点 AND 组合收窄', async () => {
    const user = userEvent.setup()
    wrap()
    await user.click(screen.getByRole('button', { name: '学生用' }))
    await user.click(screen.getByRole('button', { name: '緬甸' }))
    expect(screen.getByText('T-case04')).toBeInTheDocument() // student × myanmar
    expect(screen.queryByText('T-case24')).not.toBeInTheDocument() // student × shandong
  })

  it('无匹配组合显示空态', async () => {
    const user = userEvent.setup()
    wrap()
    await user.click(screen.getByRole('button', { name: '学生用' }))
    await user.click(screen.getByRole('button', { name: '青島打样' }))
    expect(screen.getByText('該当する事例がありません')).toBeInTheDocument()
  })

  it('リセット 恢复全部', async () => {
    const user = userEvent.setup()
    wrap()
    await user.click(screen.getByRole('button', { name: '学生用' }))
    expect(screen.queryByText('T-case01')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'リセット' }))
    expect(screen.getByText('T-case01')).toBeInTheDocument()
  })
})
