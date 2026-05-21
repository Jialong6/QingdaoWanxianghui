import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface AccordionProps {
  className?: string
  children: ReactNode
}

/**
 * Accordion 容器（design.md §3.9）
 * - 基于原生 <details> 元素，无需 JS hydration
 * - 多条之间 1px neutral-200 分隔线
 */
export function Accordion({ className, children }: AccordionProps) {
  return (
    <div className={cn('divide-y divide-neutral-200 border-y border-neutral-200', className)}>
      {children}
    </div>
  )
}

export interface AccordionItemProps {
  question: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

/**
 * Accordion 单条
 * - summary 显示问题
 * - 展开后显示答案
 * - +/- 图标用 CSS 旋转切换
 */
export function AccordionItem({
  question,
  children,
  defaultOpen = false,
  className
}: AccordionItemProps) {
  return (
    <details className={cn('group py-5 [&_summary::-webkit-details-marker]:hidden', className)} open={defaultOpen}>
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-4',
          'text-base font-medium text-neutral-900',
          'transition-colors duration-base hover:text-primary-500',
          'focus-visible:outline-none focus-visible:text-primary-500'
        )}
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="relative h-5 w-5 flex-shrink-0 transition-transform duration-base ease-out group-open:rotate-45"
        >
          <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-4 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-current" />
        </span>
      </summary>
      <div className="pt-3 text-base leading-relaxed text-neutral-700">{children}</div>
    </details>
  )
}
