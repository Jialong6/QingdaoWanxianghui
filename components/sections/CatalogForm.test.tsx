import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'

const push = vi.fn()
vi.mock('@/lib/i18n/routing', () => ({ useRouter: () => ({ push }) }))

import { CatalogForm } from './CatalogForm'
import jaMessages from '@/messages/ja.json'

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={jaMessages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('CatalogForm', () => {
  beforeEach(() => {
    push.mockClear()
    vi.restoreAllMocks()
  })

  it('渲染关键字段', () => {
    render(wrap(<CatalogForm />))
    expect(screen.getByLabelText(/御社名/)).toBeInTheDocument()
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument()
  })

  it('空提交显示校验错误，不调 fetch', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(wrap(<CatalogForm />))
    await user.click(screen.getByRole('button', { name: /送信する/ }))
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBeGreaterThan(0))
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('填全 + 同意 → 提交跳 thanks', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    )
    render(wrap(<CatalogForm />))
    await user.type(screen.getByLabelText(/御社名/), 'A 社')
    await user.type(screen.getByLabelText(/ご担当者名/), '担当')
    await user.type(screen.getByLabelText(/メールアドレス/), 'a@example.com')
    await user.click(screen.getByLabelText(/プライバシーポリシーに同意します/))
    await user.click(screen.getByRole('button', { name: /送信する/ }))
    await waitFor(() => expect(push).toHaveBeenCalledWith('/contact/thanks'))
  })
})
