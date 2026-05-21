import { describe, it, expect, afterEach, vi } from 'vitest'
import { verifyRecaptcha } from './recaptcha'

describe('verifyRecaptcha', () => {
  const originalSecret = process.env.RECAPTCHA_SECRET_KEY

  afterEach(() => {
    process.env.RECAPTCHA_SECRET_KEY = originalSecret
    vi.restoreAllMocks()
  })

  it('无 secret key 时优雅降级（ok + skipped）', async () => {
    delete process.env.RECAPTCHA_SECRET_KEY
    const r = await verifyRecaptcha('any-token')
    expect(r.ok).toBe(true)
    expect(r.skipped).toBe(true)
  })

  it('占位 XXXXXX 视为未配置', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'XXXXXX'
    const r = await verifyRecaptcha('any-token')
    expect(r.skipped).toBe(true)
  })

  it('有 key 但无 token 时失败', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'real-secret'
    const r = await verifyRecaptcha(undefined)
    expect(r.ok).toBe(false)
    expect(r.error).toBe('missing-token')
  })

  it('有 key + score 达标 → ok', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'real-secret'
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true, score: 0.9 }), { status: 200 })
    )
    const r = await verifyRecaptcha('tok')
    expect(r.ok).toBe(true)
    expect(r.score).toBe(0.9)
  })

  it('有 key + score 过低 → 不 ok', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'real-secret'
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true, score: 0.1 }), { status: 200 })
    )
    const r = await verifyRecaptcha('tok')
    expect(r.ok).toBe(false)
  })

  it('fetch 抛错 → verify-failed', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'real-secret'
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'))
    const r = await verifyRecaptcha('tok')
    expect(r.ok).toBe(false)
    expect(r.error).toBe('verify-failed')
  })
})
