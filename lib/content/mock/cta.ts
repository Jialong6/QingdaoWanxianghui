import type { CtaCard } from '@/lib/types'

/**
 * 三联 CTA（plan.md §5.1 屏 9）
 */
export const CTA_CARDS: CtaCard[] = [
  {
    id: 'inquiry',
    titleKey: 'inquiry.title',
    descKey: 'inquiry.desc',
    ctaKey: 'inquiry.cta',
    href: '/contact/inquiry'
  },
  {
    id: 'catalog',
    titleKey: 'catalog.title',
    descKey: 'catalog.desc',
    ctaKey: 'catalog.cta',
    href: '/contact/catalog'
  },
  {
    id: 'visit',
    titleKey: 'visit.title',
    descKey: 'visit.desc',
    ctaKey: 'visit.cta',
    href: '/contact/visit'
  }
]
