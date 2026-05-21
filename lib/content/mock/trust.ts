import type { CustomerSegment, Certification, MediaCoverage } from '@/lib/types'

// XXX-TODO: 待客户提供真实媒体掲載清单 / 客户授权
export const MEDIA_COVERAGES: MediaCoverage[] = [
  { id: 'media-1', name: 'Media 1' },
  { id: 'media-2', name: 'Media 2' },
  { id: 'media-3', name: 'Media 3' },
  { id: 'media-4', name: 'Media 4' },
  { id: 'media-5', name: 'Media 5' },
  { id: 'media-6', name: 'Media 6' }
]

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  { id: 'ec', labelKey: 'ec' },
  { id: 'shosha', labelKey: 'shosha' },
  { id: 'select', labelKey: 'select' },
  { id: 'indie', labelKey: 'indie' }
]

// XXX-TODO: 实际认证以客户提供为准
const CERT_PLACEHOLDER = (text: string) =>
  `https://placehold.co/200x200/F2F2EE/2D2D2A?text=${encodeURIComponent(text)}`

export const CERTIFICATIONS: Certification[] = [
  { id: 'iso9001', nameKey: 'iso9001', image: CERT_PLACEHOLDER('ISO 9001') },
  { id: 'bsci', nameKey: 'bsci', image: CERT_PLACEHOLDER('BSCI') },
  { id: 'sedex', nameKey: 'sedex', image: CERT_PLACEHOLDER('SEDEX') }
]
