import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { CONSENT_KEY } from '@/lib/analytics/consent'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  )
}))

import { ConsentProvider } from './ConsentProvider'
import { ConsentBanner } from './ConsentBanner'

const messages = {
  consent: {
    label: '同意バナー',
    message: '当サイトはアクセス解析のために Cookie を使用します。',
    accept: '同意する',
    reject: '拒否する',
    privacyLink: 'プライバシーポリシー'
  }
}

function wrap() {
  return render(
    <NextIntlClientProvider locale="ja" messages={messages}>
      <ConsentProvider>
        <ConsentBanner />
      </ConsentProvider>
    </NextIntlClientProvider>
  )
}

describe('ConsentBanner', () => {
  beforeEach(() => localStorage.clear())

  it('未决定时显示横幅 + 两个按钮 + 隐私链接', () => {
    wrap()
    expect(screen.getByRole('dialog', { name: '同意バナー' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '同意する' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '拒否する' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'プライバシーポリシー' })).toHaveAttribute(
      'href',
      '/privacy'
    )
  })

  it('点「同意する」→ 横幅消失 + localStorage=granted', async () => {
    const user = userEvent.setup()
    wrap()
    await user.click(screen.getByRole('button', { name: '同意する' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('granted')
  })

  it('点「拒否する」→ 横幅消失 + localStorage=denied', async () => {
    const user = userEvent.setup()
    wrap()
    await user.click(screen.getByRole('button', { name: '拒否する' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('denied')
  })

  it('已记忆决定（denied）时不显示', () => {
    localStorage.setItem(CONSENT_KEY, 'denied')
    wrap()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
