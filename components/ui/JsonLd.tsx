import Script from 'next/script'

export interface JsonLdProps {
  id: string
  /** Schema.org 对象（由 lib/schema.ts 生成）。允许多个 */
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/**
 * 注入 Schema.org JSON-LD（plan.md §8.2）
 * - 用 next/script（客户端注入）：Google 执行 JS 时可抓取 structured data
 * - 与 Breadcrumb 一致的方式（避开内联 HTML 注入的安全提示）
 */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <Script id={id} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(data)}
    </Script>
  )
}
