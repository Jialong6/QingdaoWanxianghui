import { WORKS } from '@/lib/content/mock/works'

/**
 * 全站静态路由（不含 locale 前缀），供 sitemap.ts + /sitemap 页复用。
 * 不含表单成功页（thanks，无索引价值）。
 */
export const STATIC_ROUTES = [
  '',
  '/strength',
  '/oem-flow',
  '/factory',
  '/works',
  '/about',
  '/news',
  '/quality',
  '/lead-time',
  '/careers',
  '/contact',
  '/contact/inquiry',
  '/contact/catalog',
  '/contact/visit',
  '/contact/sample',
  '/privacy',
  '/terms',
  '/sitemap'
] as const

/** 案例详情动态路由 */
export function workRoutes(): string[] {
  return WORKS.map((w) => `/works/${w.id}`)
}

/** 全部可索引路由（静态 + 案例详情） */
export function allRoutes(): string[] {
  return [...STATIC_ROUTES, ...workRoutes()]
}
