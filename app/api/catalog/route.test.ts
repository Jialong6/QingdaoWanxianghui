import { describe, it, expect, afterEach, vi } from 'vitest'
import { POST } from './route'

const valid = {
  companyName: '株式会社サンプル',
  contactName: '山田太郎',
  email: 'taro@example.com',
  industry: 'ec',
  privacyAgreed: true
}

function req(body: unknown, ip = '30.1.0.1') {
  return new Request('http://localhost/api/catalog', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body)
  }) as unknown as Parameters<typeof POST>[0]
}

describe('POST /api/catalog', () => {
  afterEach(() => vi.restoreAllMocks())

  it('合法请求 200（邮件降级）', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const res = await POST(req(valid, '30.1.0.10'))
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
  })

  it('校验失败 400', async () => {
    const res = await POST(req({ ...valid, email: 'bad' }, '30.1.0.11'))
    expect(res.status).toBe(400)
  })

  it('超速率 429', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    let last: Response | undefined
    for (let i = 0; i < 7; i++) last = await POST(req(valid, '30.1.0.99'))
    expect(last?.status).toBe(429)
  })
})
