import { Fragment } from 'react'
import Script from 'next/script'
import { Link as IntlLink } from '@/lib/i18n/routing'
import { cn } from '@/lib/utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  /** 站点完整 URL（用于 JSON-LD 绝对路径），默认 NEXT_PUBLIC_SITE_URL */
  siteUrl?: string
}

/**
 * 面包屑（design.md §2.3）
 * - 分隔符使用 U+203A（›）
 * - 当前页不可点击 + aria-current="page"
 * - 输出 Schema.org BreadcrumbList JSON-LD（plan.md §8.2）
 *   用 next/script 替代 dangerouslySetInnerHTML 以避免安全工具误报
 */
export function Breadcrumb({ items, className, siteUrl }: BreadcrumbProps) {
  const url = siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${url}${item.href}` } : {})
    }))
  }

  return (
    <nav
      aria-label="breadcrumb"
      className={cn('font-en-sans text-xs text-neutral-500', className)}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <Fragment key={`${item.label}-${idx}`}>
              <li>
                {item.href && !isLast ? (
                  <IntlLink
                    href={item.href}
                    className="transition-colors hover:text-primary-500"
                  >
                    {item.label}
                  </IntlLink>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className="text-neutral-700">
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden="true" className="text-neutral-400">
                  ›
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>
      <Script
        id={`breadcrumb-ld-${items.map((i) => i.label).join('-')}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
    </nav>
  )
}
