'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils/cn'

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

type NoticeVariant = 'primary' | 'accent'

const VARIANT_CLASSES: Record<NoticeVariant, string> = {
  primary: 'bg-primary-100 text-primary-900',
  accent: 'bg-accent-100 text-craft-ink'
}

export interface NoticeBarProps {
  /** 唯一 id，用于 localStorage 记忆关闭状态 */
  id: string
  message: ReactNode
  variant?: NoticeVariant
  className?: string
}

/**
 * 顶部公告条（design.md §2.4）
 * - 仅在客户端 mount 后检查 localStorage，避免水合不一致
 * - 关闭后 7 天内不再显示
 */
export function NoticeBar({ id, message, variant = 'primary', className }: NoticeBarProps) {
  const t = useTranslations('noticeBar')
  const storageKey = `noticebar:${id}`
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const closedAt = Number(localStorage.getItem(storageKey) ?? 0)
    if (closedAt && Date.now() - closedAt < SEVEN_DAYS) {
      setVisible(false)
      return
    }
    setVisible(true)
  }, [storageKey])

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="site notice banner"
      className={cn(
        'flex h-10 items-center justify-center gap-4 px-4 text-sm',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      <p className="truncate">{message}</p>
      <button
        type="button"
        aria-label={t('dismiss')}
        onClick={() => {
          localStorage.setItem(storageKey, String(Date.now()))
          setVisible(false)
        }}
        className="flex-shrink-0 rounded p-1 hover:bg-neutral-900/10"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
}
