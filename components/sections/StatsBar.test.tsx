import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { StatsBar } from './StatsBar'

const messages = {
  home: {
    stats: {
      eyebrow: 'OUR NUMBERS',
      title: '数字で見る',
      years: '20+ 年',
      yearsLabel: '創業以来',
      factories: '2 拠点',
      factoriesLabel: '中国 + 緬甸',
      staff: '約 470 名',
      staffLabel: '縫製スタッフ',
      leadTime: '3 ヶ月',
      leadTimeLabel: '大貨納期'
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

describe('StatsBar', () => {
  it('渲染 section id="stats"', () => {
    const { container } = render(wrap(<StatsBar />))
    expect(container.querySelector('section#stats')).toBeInTheDocument()
  })

  it('渲染 4 个数字 + 副标题', () => {
    render(wrap(<StatsBar />))
    expect(screen.getByText('20+ 年')).toBeInTheDocument()
    expect(screen.getByText('2 拠点')).toBeInTheDocument()
    expect(screen.getByText('約 470 名')).toBeInTheDocument()
    expect(screen.getByText('3 ヶ月')).toBeInTheDocument()

    expect(screen.getByText('創業以来')).toBeInTheDocument()
    expect(screen.getByText('中国 + 緬甸')).toBeInTheDocument()
    expect(screen.getByText('縫製スタッフ')).toBeInTheDocument()
    expect(screen.getByText('大貨納期')).toBeInTheDocument()
  })
})
