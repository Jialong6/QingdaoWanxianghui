'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils/cn'

export interface FloatingContactProps {
  /** Email 联系地址（未提供则不渲染 email 入口） */
  email?: string
  /** 电话（未提供则不渲染 phone 入口） */
  phone?: string
  /** 滚动多少像素后显现，默认 300 */
  scrollThreshold?: number
  className?: string
}

/**
 * 右下角浮动咨询按钮（design.md §2.5）
 * - 滚动 > 300px 时显现
 * - PC：圆角矩形 80×80px / 移动：圆形 56×56px
 * - 点击展开：Email / Phone（其他渠道占位 XXX）
 */
export function FloatingContact({
  email,
  phone,
  scrollThreshold = 300,
  className
}: FloatingContactProps) {
  const t = useTranslations('floatingContact')
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > scrollThreshold)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [scrollThreshold])

  if (!visible) return null

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-fixed flex flex-col items-end gap-3',
        className
      )}
    >
      {open ? (
        <div className="flex flex-col gap-2 rounded-md bg-neutral-0 p-3 shadow-lg animate-fade-in">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="rounded px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {t('email')}
            </a>
          ) : null}
          {phone ? (
            <a
              href={`tel:${phone}`}
              className="rounded px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {t('phone')}
            </a>
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        aria-label={t('label')}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'inline-flex items-center justify-center gap-1 bg-primary-500 text-neutral-0 shadow-lg',
          'transition-all duration-base hover:bg-primary-600 hover:-translate-y-px',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'h-14 w-14 rounded-full md:h-20 md:w-20 md:rounded-md md:flex-col'
        )}
      >
        <ChatIcon />
        <span className="hidden text-2xs font-medium uppercase tracking-[0.1em] md:inline">
          {t('label')}
        </span>
      </button>
    </div>
  )
}

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}
