import { describe, it, expect, afterEach, vi } from 'vitest'
import { POST } from './route'

const valid = {
  companyName: '株式会社サンプル',
  contactName: '山田太郎',
  email: 'taro@example.com',
  sites: ['qingdao'],
  preferredDate: '',
  companions: '',
  translation: 'ja',
  airportPickup: false,
  message: '',
  privacyAgreed: true
}

function req(body: unknown, ip = '31.1.0.1') {
  return new Request('http://localhost/api/visit', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body)
  }) as unknown as Parameters<typeof POST>[0]
}

describe('POST /api/visit', () => {
  afterEach(() => vi.restoreAllMocks())

  it('合法 200', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const res = await POST(req(valid, '31.1.0.10'))
    expect(res.status).toBe(200)
    expect((await res.json()).success).toBe(true)
  })

  it('sites 空 → 400', async () => {
    const res = await POST(req({ ...valid, sites: [] }, '31.1.0.11'))
    expect(res.status).toBe(400)
  })
})
