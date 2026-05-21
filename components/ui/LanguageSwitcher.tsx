'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/lib/i18n/routing'
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils/cn'

export interface LanguageSwitcherProps {
  className?: string
  /** 是否显示 label 而非缩写（如「日本語」而非「JP」） */
  showLabel?: boolean
}

const SHORT_LABELS: Record<Locale, string> = {
  ja: 'JP',
  en: 'EN',
  zh: 'ZH'
}

/**
 * 语言切换器（plan.md §6 + design.md §2.1 Header）
 * - 切换时保留当前路径（usePathname + locale 切换）
 * - 当前 locale 高亮 + aria-current
 */
export function LanguageSwitcher({ className, showLabel = true }: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale
  const pathname = usePathname()

  return (
    <nav aria-label="language switcher" className={cn('flex items-center gap-1', className)}>
      {LOCALES.map((locale) => {
        const isCurrent = locale === currentLocale
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={isCurrent ? 'true' : undefined}
            className={cn(
              'rounded px-2 py-1 font-en-sans text-xs font-medium transition-colors duration-base',
              isCurrent
                ? 'text-primary-500 bg-primary-50'
                : 'text-neutral-500 hover:text-primary-500 hover:bg-neutral-100'
            )}
          >
            {showLabel ? LOCALE_LABELS[locale] : SHORT_LABELS[locale]}
          </Link>
        )
      })}
    </nav>
  )
}
