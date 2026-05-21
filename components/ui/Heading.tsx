import { createElement, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export type HeadingLevel = 1 | 2 | 3 | 4
export type HeadingSize = 'hero' | 'display' | 'section' | 'sub'
export type HeadingAlign = 'left' | 'center'

const SIZE_CLASSES: Record<HeadingSize, string> = {
  hero: 'text-5xl md:text-6xl font-bold leading-tight tracking-[0.02em]',
  display: 'text-4xl md:text-5xl font-bold leading-tight tracking-[0.02em]',
  section: 'text-3xl md:text-4xl font-bold leading-tight tracking-[0.02em]',
  sub: 'text-2xl md:text-3xl font-semibold leading-snug tracking-[0.02em]'
}

const ALIGN_CLASSES: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center mx-auto'
}

export interface HeadingProps {
  level?: HeadingLevel
  size?: HeadingSize
  align?: HeadingAlign
  /** 英文小帽（design.md §0.1 第 4 条「英文小帽 + 日文大标题」双标题模式） */
  eyebrow?: string
  /** 副标题（标题下方说明） */
  subtitle?: ReactNode
  className?: string
  children: ReactNode
}

/**
 * 项目统一标题组件
 * - 双标题模式：可选 eyebrow + 主标题 + 可选 subtitle
 * - level 控制 HTML 语义，size 控制视觉大小（解耦）
 */
export function Heading({
  level = 2,
  size = 'section',
  align = 'left',
  eyebrow,
  subtitle,
  className,
  children
}: HeadingProps) {
  const heading = createElement(
    `h${level}`,
    {
      className: cn(
        'text-neutral-900 font-jp-sans',
        SIZE_CLASSES[size],
        ALIGN_CLASSES[align],
        className
      )
    },
    children
  )

  if (!eyebrow && !subtitle) return heading

  return (
    <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center')}>
      {eyebrow ? (
        <p
          className={cn(
            'font-en-sans text-2xs font-medium uppercase text-neutral-500 tracking-[0.2em]',
            align === 'center' && 'text-center'
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      {heading}
      {subtitle ? (
        <p
          className={cn(
            'text-base text-neutral-500 max-w-container-prose',
            align === 'center' && 'text-center mx-auto'
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
