import { describe, it, expect, beforeEach } from 'vitest'
import { CONSENT_KEY, readConsent, writeConsent } from './consent'

describe('analytics consent', () => {
  beforeEach(() => localStorage.clear())

  it('未决定时 readConsent 返回 null', () => {
    expect(readConsent()).toBeNull()
  })

  it('writeConsent 写入后 readConsent 读回', () => {
    writeConsent('granted')
    expect(localStorage.getItem(CONSENT_KEY)).toBe('granted')
    expect(readConsent()).toBe('granted')
    writeConsent('denied')
    expect(readConsent()).toBe('denied')
  })

  it('localStorage 存非法值时 readConsent 回退 null', () => {
    localStorage.setItem(CONSENT_KEY, 'garbage')
    expect(readConsent()).toBeNull()
  })
})
