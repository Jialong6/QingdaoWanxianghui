import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'

const push = vi.fn()
vi.mock('@/lib/i18n/routing', () => ({
  useRouter: () => ({ push })
}))

import { ContactForm } from './ContactForm'
import jaMessages from '@/messages/ja.json'

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={jaMessages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('ContactForm', () => {
  beforeEach(() => {
    push.mockClear()
    vi.restoreAllMocks()
  })

  it('渲染关键字段', () => {
    render(wrap(<ContactForm />))
    expect(screen.getByLabelText(/御社名/)).toBeInTheDocument()
    expect(screen.getByLabelText(/ご担当者名/)).toBeInTheDocument()
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument()
  })

  it('空提交显示校验错误，不调用 fetch', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(wrap(<ContactForm />))
    await user.click(screen.getByRole('button', { name: /送信する/ }))
    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
    })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('填全 + 同意后提交成功跳转 thanks', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    )
    render(wrap(<ContactForm />))

    await user.type(screen.getByLabelText(/御社名/), '株式会社サンプル')
    await user.type(screen.getByLabelText(/ご担当者名/), '山田太郎')
    await user.type(screen.getByLabelText(/メールアドレス/), 'taro@example.com')
    // 选一个品类
    await user.click(screen.getByText('リュック'))
    // 同意隐私
    await user.click(screen.getByLabelText(/プライバシーポリシーに同意します/))

    await user.click(screen.getByRole('button', { name: /送信する/ }))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/contact/inquiry/thanks')
    })
  })

  it('无文件时只调用 /api/inquiry（不调 upload）', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }))
    render(wrap(<ContactForm />))

    await user.type(screen.getByLabelText(/御社名/), 'A 社')
    await user.type(screen.getByLabelText(/ご担当者名/), '担当')
    await user.type(screen.getByLabelText(/メールアドレス/), 'a@example.com')
    await user.click(screen.getByText('リュック'))
    await user.click(screen.getByLabelText(/プライバシーポリシーに同意します/))
    await user.click(screen.getByRole('button', { name: /送信する/ }))

    await waitFor(() => expect(push).toHaveBeenCalled())
    const urls = fetchSpy.mock.calls.map((c) => c[0])
    expect(urls).toContain('/api/inquiry')
    expect(urls).not.toContain('/api/upload')
  })

  it('有文件时先调 /api/upload 再调 /api/inquiry', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      if (String(url) === '/api/upload') {
        return new Response(
          JSON.stringify({ success: true, data: [{ name: 'a.pdf', size: 10, type: 'application/pdf' }] }),
          { status: 200 }
        )
      }
      return new Response(JSON.stringify({ success: true }), { status: 200 })
    })
    render(wrap(<ContactForm />))

    await user.type(screen.getByLabelText(/御社名/), 'A 社')
    await user.type(screen.getByLabelText(/ご担当者名/), '担当')
    await user.type(screen.getByLabelText(/メールアドレス/), 'a@example.com')
    await user.click(screen.getByText('リュック'))

    const fileInput = document.getElementById('attachments') as HTMLInputElement
    fireEvent.change(fileInput, {
      target: { files: [new File(['x'], 'a.pdf', { type: 'application/pdf' })] }
    })

    await user.click(screen.getByLabelText(/プライバシーポリシーに同意します/))
    await user.click(screen.getByRole('button', { name: /送信する/ }))

    await waitFor(() => expect(push).toHaveBeenCalled())
    const urls = fetchSpy.mock.calls.map((c) => String(c[0]))
    expect(urls[0]).toBe('/api/upload')
    expect(urls).toContain('/api/inquiry')
  })
})
