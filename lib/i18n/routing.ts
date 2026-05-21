import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import { LOCALES, DEFAULT_LOCALE } from './config'

/**
 * next-intl 路由配置
 * - localePrefix: 'as-needed' 表示默认语言 ja 不带前缀（/），en/zh 带前缀（/en /zh）
 * - 符合 plan.md §6.1：日 IP→/、其他→/en、中→/zh
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed'
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
