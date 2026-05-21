import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { PainPointsSection } from './PainPointsSection'

const items: Record<string, { problem: string; solution: string }> = {
  language: { problem: 'P1', solution: 'S1' },
  rush: { problem: 'P2', solution: 'S2' },
  smallLot: { problem: 'P3', solution: 'S3' },
  pricing: { problem: 'P4', solution: 'S4' },
  transparency: { problem: 'P5', solution: 'S5' }
}

const messages = {
  home: {
    painPoints: {
      eyebrow: 'FAQ',
      title: 'お悩み 5 つ',
      subtitle: '副文',
      problemLabel: 'お悩み',
      solutionLabel: '答え',
      items
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

describe('PainPointsSection', () => {
  it('section id="pain-points"', () => {
    const { container } = render(wrap(<PainPointsSection />))
    expect(container.querySelector('section#pain-points')).toBeInTheDocument()
  })

  it('渲染 5 个 pain + 5 个 solution', () => {
    render(wrap(<PainPointsSection />))
    for (const key of ['P1', 'P2', 'P3', 'P4', 'P5']) {
      expect(screen.getByText(key)).toBeInTheDocument()
    }
    for (const key of ['S1', 'S2', 'S3', 'S4', 'S5']) {
      expect(screen.getByText(key)).toBeInTheDocument()
    }
  })
})
