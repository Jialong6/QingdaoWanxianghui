import { describe, it, expect, beforeEach, vi } from 'vitest'
import { trackEvent } from './events'
import { writeConsent } from './consent'

declare global {
  // eslint-disable-next-line no-var
  var dataLayer: Array<Record<string, unknown>> | undefined
}

describe('trackEvent', () => {
  beforeEach(() => {
    localStorage.clear()
    window.dataLayer = []
    vi.unstubAllGlobals()
  })

  it('同意后推送事件到 dataLayer', () => {
    writeConsent('granted')
    trackEvent('form_submit', { form: 'inquiry' })
    expect(window.dataLayer).toContainEqual({ event: 'form_submit', form: 'inquiry' })
  })

  it('未同意时不推送（no-op）', () => {
    // 未决定
    trackEvent('form_submit', { form: 'inquiry' })
    expect(window.dataLayer).toHaveLength(0)
  })

  it('拒绝时不推送', () => {
    writeConsent('denied')
    trackEvent('form_submit', { form: 'catalog' })
    expect(window.dataLayer).toHaveLength(0)
  })

  it('granted 且存在 gtag 时也调用 gtag', () => {
    writeConsent('granted')
    const gtag = vi.fn()
    vi.stubGlobal('gtag', gtag)
    trackEvent('cta_click', { id: 'hero' })
    expect(gtag).toHaveBeenCalledWith('event', 'cta_click', { id: 'hero' })
  })

  it('无 dataLayer 也不抛错', () => {
    writeConsent('granted')
    window.dataLayer = undefined
    expect(() => trackEvent('x')).not.toThrow()
  })
})
