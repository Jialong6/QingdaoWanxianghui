import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Section } from './Section'

describe('Section', () => {
  it('渲染为 section 元素 + 默认间距', () => {
    render(
      <Section data-testid="s">
        <p>x</p>
      </Section>
    )
    const s = screen.getByTestId('s')
    expect(s.tagName).toBe('SECTION')
    expect(s.className).toMatch(/py-16|py-20/)
  })

  it('id 透传到 section 元素（用于锚点导航）', () => {
    render(
      <Section id="strengths" data-testid="s">
        x
      </Section>
    )
    expect(screen.getByTestId('s')).toHaveAttribute('id', 'strengths')
  })

  it('eyebrow + title 渲染双标题', () => {
    render(
      <Section eyebrow="STRENGTHS" title="五つの強み">
        x
      </Section>
    )
    expect(screen.getByText('STRENGTHS')).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent('五つの強み')
  })

  it('subtitle 渲染描述', () => {
    render(
      <Section title="X" subtitle="副文案">
        x
      </Section>
    )
    expect(screen.getByText('副文案')).toBeInTheDocument()
  })

  it('background=craft 应用工房纸感背景', () => {
    render(
      <Section background="craft" data-testid="s">
        x
      </Section>
    )
    expect(screen.getByTestId('s').className).toMatch(/bg-craft-paper/)
  })

  it('background=primary 应用 primary-900 深蓝背景', () => {
    render(
      <Section background="primary" data-testid="s">
        x
      </Section>
    )
    expect(screen.getByTestId('s').className).toMatch(/bg-primary-900/)
  })
})
