import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('渲染 children + 默认样式（圆角 + 阴影）', () => {
    render(
      <Card data-testid="c">
        <p>内容</p>
      </Card>
    )
    const c = screen.getByTestId('c')
    expect(c.className).toMatch(/rounded-md/)
    expect(c.className).toMatch(/shadow-sm/)
  })

  it('hoverable=true 时含 hover 阴影 + translateY', () => {
    render(
      <Card hoverable data-testid="c">
        x
      </Card>
    )
    expect(screen.getByTestId('c').className).toMatch(/hover:shadow-md/)
  })

  it('as=article 渲染为 article 元素', () => {
    render(
      <Card as="article" data-testid="c">
        x
      </Card>
    )
    expect(screen.getByTestId('c').tagName).toBe('ARTICLE')
  })

  it('padding=lg 加大内边距', () => {
    render(
      <Card padding="lg" data-testid="c">
        x
      </Card>
    )
    expect(screen.getByTestId('c').className).toMatch(/p-8/)
  })

  it('padding=none 不加 padding', () => {
    render(
      <Card padding="none" data-testid="c">
        x
      </Card>
    )
    expect(screen.getByTestId('c').className).not.toMatch(/\bp-\d/)
  })

  it('Card.Body 渲染内容包装', () => {
    render(
      <Card padding="none">
        <Card.Body data-testid="body">内</Card.Body>
      </Card>
    )
    expect(screen.getByTestId('body')).toBeInTheDocument()
  })
})
