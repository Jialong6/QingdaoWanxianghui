import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { Link } from './Link'

function withProvider(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={{}}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('Link', () => {
  it('渲染 children 文字与 href', () => {
    render(withProvider(<Link href="/strength">強み</Link>))
    const anchor = screen.getByRole('link', { name: '強み' })
    expect(anchor).toBeInTheDocument()
  })

  it('外部链接（http://开头）走 <a> 并加 rel="noopener noreferrer"', () => {
    render(<Link href="https://example.com" external>外部</Link>)
    const anchor = screen.getByRole('link')
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
    expect(anchor).toHaveAttribute('target', '_blank')
  })

  it('variant=primary 含 primary 色文字', () => {
    render(withProvider(<Link href="/x" variant="primary">X</Link>))
    expect(screen.getByRole('link').className).toMatch(/text-primary-500/)
  })

  it('variant=muted 含 neutral 色文字', () => {
    render(withProvider(<Link href="/x" variant="muted">X</Link>))
    expect(screen.getByRole('link').className).toMatch(/text-neutral-500/)
  })

  it('underline=on 时含 underline 类', () => {
    render(withProvider(<Link href="/x" underline>X</Link>))
    expect(screen.getByRole('link').className).toMatch(/underline/)
  })
})
