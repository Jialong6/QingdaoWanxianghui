import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { CONSENT_KEY } from '@/lib/analytics/consent'

// 把 next/script 降级为普通 script，便于断言注入与否
vi.mock('next/script', () => ({
  default: ({ id, children }: { id: string; children?: React.ReactNode }) => (
    <script data-testid={id}>{children}</script>
  )
}))

async function renderAnalytics() {
  // resetModules 后 Analytics 与 ConsentProvider 必须同源（共享同一 Context 实例）
  const { ConsentProvider } = await import('./ConsentProvider')
  const { Analytics } = await import('./Analytics')
  return render(
    <ConsentProvider>
      <Analytics />
    </ConsentProvider>
  )
}

describe('Analytics 同意门控', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
    vi.unstubAllEnvs()
  })
  afterEach(() => vi.unstubAllEnvs())

  it('未同意 → 不注入任何脚本', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST')
    const { container } = await renderAnalytics()
    expect(container.querySelector('script')).toBeNull()
  })

  it('拒绝 → 不注入', async () => {
    localStorage.setItem(CONSENT_KEY, 'denied')
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST')
    const { container } = await renderAnalytics()
    expect(container.querySelector('script')).toBeNull()
  })

  it('同意但无 env ID → 不注入', async () => {
    localStorage.setItem(CONSENT_KEY, 'granted')
    const { container } = await renderAnalytics()
    expect(container.querySelector('script')).toBeNull()
  })

  it('同意 + GA_ID → 注入 GA4 脚本', async () => {
    localStorage.setItem(CONSENT_KEY, 'granted')
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST')
    const { findByTestId } = await renderAnalytics()
    expect(await findByTestId('ga4-src')).toBeInTheDocument()
    expect(await findByTestId('ga4-init')).toBeInTheDocument()
  })

  it('同意 + GTM_ID → 注入 GTM 脚本', async () => {
    localStorage.setItem(CONSENT_KEY, 'granted')
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', 'GTM-TEST')
    const { findByTestId } = await renderAnalytics()
    expect(await findByTestId('gtm-init')).toBeInTheDocument()
  })
})
