import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { FloatingContact } from './FloatingContact'

const messages = {
  floatingContact: {
    label: '相談',
    email: 'メールでお問い合わせ',
    phone: '電話で相談',
    close: '閉じる'
  }
}

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={messages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('FloatingContact', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 })
  })

  it('滚动 < 300px 时隐藏', () => {
    render(wrap(<FloatingContact email="sales@example.com" />))
    expect(screen.queryByLabelText('相談')).not.toBeInTheDocument()
  })

  it('滚动 > 300px 时显现', () => {
    render(wrap(<FloatingContact email="sales@example.com" />))
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 500 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(screen.getByLabelText('相談')).toBeInTheDocument()
  })

  it('点击展开后显示 email mailto 链接', async () => {
    const user = userEvent.setup()
    render(wrap(<FloatingContact email="sales@example.com" />))
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 500 })
      window.dispatchEvent(new Event('scroll'))
    })
    await user.click(screen.getByLabelText('相談'))
    const emailLink = screen.getByRole('link', { name: /メール/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:sales@example.com')
  })

  it('未提供 email 时不渲染 email 入口', async () => {
    const user = userEvent.setup()
    render(wrap(<FloatingContact />))
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 500 })
      window.dispatchEvent(new Event('scroll'))
    })
    await user.click(screen.getByLabelText('相談'))
    expect(screen.queryByRole('link', { name: /メール/i })).not.toBeInTheDocument()
  })
})
