import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { NoticeBar } from './NoticeBar'

const messages = { noticeBar: { dismiss: '閉じる' } }

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={messages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('NoticeBar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('渲染 message 文字', () => {
    render(wrap(<NoticeBar id="spring-2026" message="春節休假 2/8-2/14" />))
    expect(screen.getByText('春節休假 2/8-2/14')).toBeInTheDocument()
  })

  it('aria-label="banner"', () => {
    render(wrap(<NoticeBar id="x" message="X" />))
    expect(screen.getByRole('region', { name: /notice|banner/i })).toBeInTheDocument()
  })

  it('点击关闭按钮后隐藏 + 写入 localStorage', async () => {
    const user = userEvent.setup()
    render(wrap(<NoticeBar id="spring-2026" message="X" />))
    await user.click(screen.getByLabelText('閉じる'))
    expect(screen.queryByText('X')).not.toBeInTheDocument()
    expect(localStorage.getItem('noticebar:spring-2026')).toBeTruthy()
  })

  it('localStorage 已记录关闭时，初次渲染就隐藏', () => {
    localStorage.setItem('noticebar:spring-2026', String(Date.now()))
    render(wrap(<NoticeBar id="spring-2026" message="X" />))
    expect(screen.queryByText('X')).not.toBeInTheDocument()
  })

  it('variant=accent 应用暖橙背景', () => {
    render(wrap(<NoticeBar id="y" message="X" variant="accent" />))
    expect(screen.getByRole('region').className).toMatch(/bg-accent/)
  })
})
