import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading', () => {
  it('默认渲染为 h2', () => {
    render(<Heading>強み</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('強み')
  })

  it.each([1, 2, 3, 4] as const)('level=%i 渲染对应 h 标签', (level) => {
    render(<Heading level={level}>X</Heading>)
    expect(screen.getByRole('heading', { level })).toBeInTheDocument()
  })

  it('eyebrow 渲染英文小帽（全大写 + tracking）', () => {
    render(<Heading eyebrow="STRENGTHS">強み</Heading>)
    expect(screen.getByText('STRENGTHS')).toBeInTheDocument()
    expect(screen.getByText('STRENGTHS').className).toMatch(/uppercase|eyebrow/)
  })

  it('size=hero 渲染 display 字号', () => {
    render(<Heading size="hero">どこまでも</Heading>)
    expect(screen.getByRole('heading').className).toMatch(/text-5xl/)
  })

  it('size=section 渲染 section 字号', () => {
    render(<Heading size="section">五つの強み</Heading>)
    expect(screen.getByRole('heading').className).toMatch(/text-3xl/)
  })

  it('subtitle 渲染在标题下方', () => {
    render(
      <Heading subtitle="副标题">主标题</Heading>
    )
    expect(screen.getByText('副标题')).toBeInTheDocument()
  })

  it('align=center 应用居中样式', () => {
    render(<Heading align="center">中</Heading>)
    expect(screen.getByRole('heading').className).toMatch(/text-center/)
  })
})
