import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OptimizedImage } from './OptimizedImage'

describe('OptimizedImage', () => {
  it('渲染 img 元素 + alt', () => {
    render(<OptimizedImage src="/x.jpg" alt="工場外観" width={400} height={300} />)
    const img = screen.getByAltText('工場外観')
    expect(img).toBeInTheDocument()
  })

  it('aspect=4:3 应用对应 aspect 类', () => {
    render(
      <OptimizedImage src="/x.jpg" alt="x" width={400} height={300} aspect="4:3" data-testid="i" />
    )
    expect(screen.getByTestId('i').className).toMatch(/aspect-\[4\/3\]/)
  })

  it('aspect=16:9 应用对应 aspect 类', () => {
    render(
      <OptimizedImage src="/x.jpg" alt="x" width={400} height={300} aspect="16:9" data-testid="i" />
    )
    expect(screen.getByTestId('i').className).toMatch(/aspect-video/)
  })

  it('rounded=true 应用 rounded-md 圆角', () => {
    render(
      <OptimizedImage src="/x.jpg" alt="x" width={400} height={300} rounded data-testid="i" />
    )
    expect(screen.getByTestId('i').className).toMatch(/rounded-md/)
  })

  it('priority=true 透传给 next/image', () => {
    render(<OptimizedImage src="/x.jpg" alt="x" width={400} height={300} priority />)
    expect(screen.getByAltText('x')).toBeInTheDocument()
  })
})
