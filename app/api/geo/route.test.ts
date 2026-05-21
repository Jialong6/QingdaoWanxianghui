import { describe, it, expect } from 'vitest'
import { GET } from './route'

function makeRequest(headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/geo', {
    method: 'GET',
    headers
  }) as unknown as Parameters<typeof GET>[0]
}

describe('GET /api/geo', () => {
  it('Vercel 头 x-vercel-ip-country → countryCode', async () => {
    const res = await GET(makeRequest({ 'x-vercel-ip-country': 'CN' }))
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.data.countryCode).toBe('CN')
    expect(json.data.countryName).toBeTruthy()
  })

  it('Cloudflare 头 cf-ipcountry 兜底', async () => {
    const res = await GET(makeRequest({ 'cf-ipcountry': 'JP' }))
    const json = await res.json()
    expect(json.data.countryCode).toBe('JP')
  })

  it('Vercel 头优先于 Cloudflare 头', async () => {
    const res = await GET(
      makeRequest({ 'x-vercel-ip-country': 'US', 'cf-ipcountry': 'JP' })
    )
    const json = await res.json()
    expect(json.data.countryCode).toBe('US')
  })

  it('无地理头 → 优雅降级 countryCode=null', async () => {
    const res = await GET(makeRequest())
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.data.countryCode).toBeNull()
    expect(json.data.countryName).toBeNull()
  })
})
