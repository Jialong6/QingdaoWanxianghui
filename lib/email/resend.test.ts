import { describe, it, expect, afterEach, vi } from 'vitest'
import { sendInquiryEmails, notifyFormSubmission } from './resend'
import type { InquiryInput } from '@/lib/validations/inquiry'

const data: InquiryInput = {
  companyName: '株式会社サンプル',
  contactName: '山田太郎',
  email: 'taro@example.com',
  phone: '',
  language: 'ja',
  productCategory: ['backpack'],
  quantity: '',
  desiredLeadTime: '',
  quoteTerms: 'fob',
  message: '',
  privacyAgreed: true
}

describe('sendInquiryEmails', () => {
  const original = process.env.RESEND_API_KEY

  afterEach(() => {
    process.env.RESEND_API_KEY = original
    vi.restoreAllMocks()
  })

  it('无 API key 时降级为日志（skipped），不发请求', async () => {
    delete process.env.RESEND_API_KEY
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const r = await sendInquiryEmails(data)
    expect(r.skipped).toBe(true)
    expect(r.sent).toBe(false)
    expect(warn).toHaveBeenCalled()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('占位 re_XXX 视为未配置', async () => {
    process.env.RESEND_API_KEY = 're_XXXXXX'
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const r = await sendInquiryEmails(data)
    expect(r.skipped).toBe(true)
  })

  it('有真实 key 时发双邮件（2 次 fetch）', async () => {
    process.env.RESEND_API_KEY = 're_realkey123'
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }))
    const r = await sendInquiryEmails(data)
    expect(r.sent).toBe(true)
    expect(fetchSpy).toHaveBeenCalledTimes(2)
  })

  it('发送失败返回 send-failed', async () => {
    process.env.RESEND_API_KEY = 're_realkey123'
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('err', { status: 500 }))
    const r = await sendInquiryEmails(data)
    expect(r.sent).toBe(false)
    expect(r.error).toBe('send-failed')
  })
})

describe('notifyFormSubmission', () => {
  const original = process.env.RESEND_API_KEY

  afterEach(() => {
    process.env.RESEND_API_KEY = original
    vi.restoreAllMocks()
  })

  it('无 key 时降级 console（skipped），不发请求', async () => {
    delete process.env.RESEND_API_KEY
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const r = await notifyFormSubmission('catalog', { companyName: 'A 社' })
    expect(r.skipped).toBe(true)
    expect(warn).toHaveBeenCalled()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('有 key 时发 1 封通知', async () => {
    process.env.RESEND_API_KEY = 're_realkey123'
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }))
    const r = await notifyFormSubmission('visit', { companyName: 'A 社' })
    expect(r.sent).toBe(true)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })
})
