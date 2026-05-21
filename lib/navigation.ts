/**
 * 导航常量（与 plan.md §4.3 主导航 7 项对齐）
 */

export const NAVBAR_HEIGHT = 80
export const NAVBAR_HEIGHT_MOBILE = 64
export const SCROLL_THRESHOLD = 32

/**
 * 首页 9 屏 section id（plan.md §5.1）
 * 用于 IntersectionObserver 高亮当前 section
 */
export const SECTION_IDS = [
  'hero',
  'stats',
  'strengths',
  'pain-points',
  'works',
  'oem-flow',
  'factory',
  'trust',
  'cta'
] as const

export type SectionId = (typeof SECTION_IDS)[number]

/**
 * 主导航 7 项（plan.md §4.3）
 * - 链接路径不带 locale 前缀，由 next-intl Link 自动处理
 */
export interface NavItem {
  id: string
  href: string
  i18nKey: string
}

export const MAIN_NAV: NavItem[] = [
  { id: 'strength', href: '/strength', i18nKey: 'nav.strength' },
  { id: 'oem-flow', href: '/oem-flow', i18nKey: 'nav.oemFlow' },
  { id: 'factory', href: '/factory', i18nKey: 'nav.factory' },
  { id: 'works', href: '/works', i18nKey: 'nav.works' },
  { id: 'about', href: '/about', i18nKey: 'nav.about' },
  { id: 'news', href: '/news', i18nKey: 'nav.news' },
  { id: 'contact', href: '/contact', i18nKey: 'nav.contact' }
]

export const FOOTER_LEGAL_NAV: NavItem[] = [
  { id: 'privacy', href: '/privacy', i18nKey: 'nav.privacy' },
  { id: 'terms', href: '/terms', i18nKey: 'nav.terms' }
]
