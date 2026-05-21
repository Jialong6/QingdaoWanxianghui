import type { MetadataRoute } from 'next'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/config'
import { allRoutes } from '@/lib/routes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/**
 * 全站 sitemap：每条路由 × 3 locale（plan.md §8.2）
 * - 默认 locale（ja）无前缀；en/zh 带前缀
 * - 每条含 alternates.languages（hreflang）
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const path of allRoutes()) {
    for (const locale of LOCALES) {
      const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
      const url = `${SITE_URL}${prefix}${path}`

      const languages: Record<string, string> = {}
      for (const l of LOCALES) {
        const p = l === DEFAULT_LOCALE ? '' : `/${l}`
        languages[l] = `${SITE_URL}${p}${path}`
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: { languages }
      })
    }
  }

  return entries
}
