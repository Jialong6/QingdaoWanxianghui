import { describe, it, expect, afterEach, vi } from 'vitest'
import { POST } from './route'

const validBody = {
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

function makeRequest(body: unknown, ip = '1.2.3.4') {
  return new Request('http://localhost/api/inquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body)
  }) as unknown as Parameters<typeof POST>[0]
}

describe('POST /api/inquiry', () => {
  afterEach(() => vi.restoreAllMocks())

  it('合法请求返回 success（邮件降级）', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const res = await POST(makeRequest(validBody, '10.0.0.1'))
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
  })

  it('校验失败返回 400 + issues', async () => {
    const res = await POST(makeRequest({ ...validBody, email: 'bad' }, '10.0.0.2'))
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.error).toBe('validation')
  })

  it('privacyAgreed=false 返回 400', async () => {
    const res = await POST(makeRequest({ ...validBody, privacyAgreed: false }, '10.0.0.3'))
    expect(res.status).toBe(400)
  })

  it('无效 JSON 返回 400', async () => {
    const bad = new Request('http://localhost/api/inquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.0.4' },
      body: 'not-json{'
    }) as unknown as Parameters<typeof POST>[0]
    const res = await POST(bad)
    expect(res.status).toBe(400)
  })

  it('超过速率限制返回 429', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const ip = '10.0.0.99'
    let last: Response | undefined
    for (let i = 0; i < 7; i++) {
      last = await POST(makeRequest(validBody, ip))
    }
    expect(last?.status).toBe(429)
  })
})
