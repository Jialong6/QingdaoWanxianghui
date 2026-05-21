import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import fc from 'fast-check'
import { Badge, BADGE_VARIANTS } from './Badge'

describe('Badge', () => {
  it('渲染 children 文字', () => {
    render(<Badge>新着</Badge>)
    expect(screen.getByText('新着')).toBeInTheDocument()
  })

  it.each(BADGE_VARIANTS)('variant=%s 渲染对应背景类', (variant) => {
    const { container } = render(<Badge variant={variant}>X</Badge>)
    const el = container.firstChild as HTMLElement
    expect(el.className).toMatch(/bg-/)
  })

  it('primary 变体含 primary-50 / primary-700', () => {
    render(<Badge variant="primary">P</Badge>)
    const el = screen.getByText('P')
    expect(el.className).toMatch(/bg-primary-50/)
    expect(el.className).toMatch(/text-primary-700/)
  })

  it('accent 变体含 accent-50 / accent-700', () => {
    render(<Badge variant="accent">A</Badge>)
    const el = screen.getByText('A')
    expect(el.className).toMatch(/bg-accent-50/)
    expect(el.className).toMatch(/text-accent-700/)
  })

  it('Property: 任意变体都返回非空 className', () => {
    fc.assert(
      fc.property(fc.constantFrom(...BADGE_VARIANTS), (variant) => {
        const { container, unmount } = render(<Badge variant={variant}>X</Badge>)
        const el = container.firstChild as HTMLElement
        expect(el.className.length).toBeGreaterThan(0)
        unmount()
      }),
      { numRuns: 20 }
    )
  })
})
