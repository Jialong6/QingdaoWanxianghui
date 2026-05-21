'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { readConsent, writeConsent, type ConsentValue } from '@/lib/analytics/consent'

interface ConsentContextValue {
  consent: ConsentValue
  setConsent: (value: Exclude<ConsentValue, null>) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

/**
 * 分析同意状态 Provider
 * - mount 后从 localStorage 读取（避免 SSR 水合不一致：初始恒为 null）
 * - setConsent 写回 localStorage 并即时更新状态（同意后无需刷新）
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentValue>(null)

  useEffect(() => {
    setConsentState(readConsent())
  }, [])

  const setConsent = (value: Exclude<ConsentValue, null>) => {
    writeConsent(value)
    setConsentState(value)
  }

  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>
      {children}
    </ConsentContext.Provider>
  )
}

/** 读取同意 Context（须在 ConsentProvider 内使用） */
export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider')
  return ctx
}
