import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepTimeline } from './StepTimeline'

const steps = [
  { label: '見積', meta: '即日', body: '品類・数量を伺います' },
  { label: '初サンプル', meta: '約 7 日' },
  { label: '量産' }
]

describe('StepTimeline', () => {
  it('渲染全部步骤标题', () => {
    render(<StepTimeline steps={steps} />)
    expect(screen.getByText('見積')).toBeInTheDocument()
    expect(screen.getByText('初サンプル')).toBeInTheDocument()
    expect(screen.getByText('量産')).toBeInTheDocument()
  })

  it('编号从 1 递增', () => {
    render(<StepTimeline steps={steps} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('渲染可选 meta / body，无则不渲染', () => {
    render(<StepTimeline steps={steps} />)
    expect(screen.getByText('即日')).toBeInTheDocument()
    expect(screen.getByText('品類・数量を伺います')).toBeInTheDocument()
    // 第三步无 meta/body
    expect(screen.queryByText('約 7 日')).toBeInTheDocument()
  })

  it('列表项数量 = steps 长度', () => {
    const { container } = render(<StepTimeline steps={steps} />)
    expect(container.querySelectorAll('li')).toHaveLength(3)
  })
})
