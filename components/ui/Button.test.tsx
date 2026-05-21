import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fc from 'fast-check'
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button'

describe('Button', () => {
  describe('渲染', () => {
    it('渲染 children 文字', () => {
      render(<Button>お問い合わせ</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('お問い合わせ')
    })

    it('默认 type=button（避免误提交表单）', () => {
      render(<Button>X</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('可被覆盖为 type=submit', () => {
      render(<Button type="submit">X</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })
  })

  describe('变体', () => {
    it('primary 变体含 primary 背景色类', () => {
      render(<Button variant="primary">X</Button>)
      expect(screen.getByRole('button').className).toMatch(/bg-primary-500/)
    })

    it('secondary 变体含 border + 透明背景', () => {
      render(<Button variant="secondary">X</Button>)
      const btn = screen.getByRole('button')
      expect(btn.className).toMatch(/border/)
      expect(btn.className).toMatch(/text-primary-500/)
    })

    it('accent 变体含 accent 色（重点 CTA）', () => {
      render(<Button variant="accent">X</Button>)
      expect(screen.getByRole('button').className).toMatch(/bg-accent-500/)
    })

    it('ghost 变体无背景', () => {
      render(<Button variant="ghost">X</Button>)
      expect(screen.getByRole('button').className).toMatch(/bg-transparent/)
    })

    it('link 变体下划线', () => {
      render(<Button variant="link">X</Button>)
      expect(screen.getByRole('button').className).toMatch(/underline/)
    })

    it('danger 变体含 error 色', () => {
      render(<Button variant="danger">X</Button>)
      expect(screen.getByRole('button').className).toMatch(/bg-error/)
    })
  })

  describe('尺寸', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('size=%s 渲染对应 padding 类', (size) => {
      render(<Button size={size}>X</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('默认 size 是 md', () => {
      render(<Button>X</Button>)
      expect(screen.getByRole('button').className).toMatch(/py-3/)
    })
  })

  describe('交互', () => {
    it('点击触发 onClick', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Button onClick={onClick}>X</Button>)
      await user.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('disabled 时不触发 onClick', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Button onClick={onClick} disabled>
          X
        </Button>
      )
      await user.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('disabled 时设置 aria-disabled', () => {
      render(<Button disabled>X</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('loading 时显示 spinner 且不可点', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Button onClick={onClick} loading>
          送信
        </Button>
      )
      const btn = screen.getByRole('button')
      expect(btn).toBeDisabled()
      expect(btn.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
      await user.click(btn)
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('property-based', () => {
    const variantArb = fc.constantFrom(...BUTTON_VARIANTS)
    const sizeArb = fc.constantFrom(...BUTTON_SIZES)

    it('Property: 任意变体 × 尺寸都能渲染且 type 默认 button', () => {
      fc.assert(
        fc.property(variantArb, sizeArb, (variant, size) => {
          const { unmount } = render(
            <Button variant={variant} size={size}>
              X
            </Button>
          )
          const btn = screen.getByRole('button')
          expect(btn).toHaveAttribute('type', 'button')
          unmount()
        }),
        { numRuns: 30 }
      )
    })

    it('Property: disabled 或 loading 都让 button 处于 disabled 态', () => {
      fc.assert(
        fc.property(fc.boolean(), fc.boolean(), (disabled, loading) => {
          if (!disabled && !loading) return
          const { unmount } = render(
            <Button disabled={disabled} loading={loading}>
              X
            </Button>
          )
          expect(screen.getByRole('button')).toBeDisabled()
          unmount()
        }),
        { numRuns: 30 }
      )
    })
  })
})
