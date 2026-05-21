import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Container, CONTAINER_SIZES } from './Container'

describe('Container', () => {
  it('默认渲染为 div + xl 宽度', () => {
    render(<Container data-testid="c">x</Container>)
    const c = screen.getByTestId('c')
    expect(c.tagName).toBe('DIV')
    expect(c.className).toMatch(/max-w-container-xl/)
  })

  it('可指定 as=section 渲染为不同标签', () => {
    render(
      <Container as="section" data-testid="c">
        x
      </Container>
    )
    expect(screen.getByTestId('c').tagName).toBe('SECTION')
  })

  it.each(CONTAINER_SIZES)('size=%s 渲染对应 max-w', (size) => {
    render(
      <Container size={size} data-testid="c">
        x
      </Container>
    )
    expect(screen.getByTestId('c').className).toContain(`max-w-container-${size}`)
  })

  it('支持透传 className 且不被覆盖（tailwind-merge 会保留两边）', () => {
    render(
      <Container className="bg-craft-paper" data-testid="c">
        x
      </Container>
    )
    expect(screen.getByTestId('c').className).toMatch(/bg-craft-paper/)
  })
})
