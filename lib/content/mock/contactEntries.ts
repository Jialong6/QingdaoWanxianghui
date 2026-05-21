import type { ContactEntry } from '@/lib/types'

/**
 * 四联入口卡（plan.md §5.13.1）
 * - inquiry 已就绪；catalog/visit/sample 表单页 M6.5 建
 */
export const CONTACT_ENTRIES: ContactEntry[] = [
  { id: 'inquiry', href: '/contact/inquiry', icon: '✉' },
  { id: 'catalog', href: '/contact/catalog', icon: '↓' },
  { id: 'visit', href: '/contact/visit', icon: '◷' },
  { id: 'sample', href: '/contact/sample', icon: '✂' }
]
