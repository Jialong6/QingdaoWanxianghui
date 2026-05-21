'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/i18n/routing'
import { countryToLocale } from '@/lib/i18n/geo'
import { type Locale } from '@/lib/i18n/config'
import { useGeoCountry } from '@/hooks/useGeoCountry'
import { NoticeBar } from './NoticeBar'

/**
 * 语言建议横幅（CLAUDE.md §4.5 第 9 条 · 增强）
 * - 用 IP 地理（/api/geo）推断访客应看的 locale
 * - 仅当「检测到国家」且「推断 locale ≠ 当前 locale」时，提示一键切换
 *   （地理未检测到时不打扰；硬落地仍交给 next-intl Accept-Language）
 * - 关闭/7 天记忆复用 NoticeBar 自带的 localStorage
 */
export function LocaleSuggestionBanner() {
  const t = useTranslations('localeSuggestion')
  const currentLocale = useLocale() as Locale
  const pathname = usePathname()
  const { countryCode, isLoading } = useGeoCountry()

  // 未检测到国家（本地 dev / 加载中）→ 不打扰
  if (isLoading || !countryCode) return null

  const suggested = countryToLocale(countryCode)
  if (suggested === currentLocale) return null

  return (
    <NoticeBar
      id={`locale-suggest-${suggested}`}
      variant="accent"
      message={
        <Link
          href={pathname}
          locale={suggested}
          className="underline underline-offset-2 hover:no-underline"
        >
          {t(suggested)}
        </Link>
      }
    />
  )
}
