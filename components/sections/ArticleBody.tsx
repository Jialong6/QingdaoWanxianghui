import type { Locale } from '@/lib/i18n/config'
import type { Block } from '@/lib/content/mock/articles'

export interface ArticleBodyProps {
  blocks: Block[]
  locale: Locale
}

/**
 * 文章正文渲染（纯文本 block，不渲染原始 HTML → 防 XSS）
 * 支持 p / h2 / ul（design.md 排版 token）
 */
export function ArticleBody({ blocks, locale }: ArticleBodyProps) {
  return (
    <div className="mt-10 flex flex-col gap-5">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="mt-4 text-xl font-bold text-neutral-900">
              {block.text[locale]}
            </h2>
          )
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="flex flex-col gap-2">
              {block.items[locale].map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-body text-neutral-700">
                  <span aria-hidden="true" className="mt-1 text-primary-500">
                    ・
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-body leading-relaxed text-neutral-700">
            {block.text[locale]}
          </p>
        )
      })}
    </div>
  )
}
