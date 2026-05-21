import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { Container, type ContainerSize } from './Container'
import { Heading, type HeadingAlign, type HeadingLevel } from './Heading'

export type SectionBackground = 'default' | 'subtle' | 'craft' | 'primary' | 'transparent'

const BG_CLASSES: Record<SectionBackground, string> = {
  default: 'bg-neutral-0',
  subtle: 'bg-neutral-50',
  craft: 'bg-craft-paper text-craft-ink',
  primary: 'bg-primary-900 text-neutral-50',
  transparent: 'bg-transparent'
}

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** section 锚点 id（plan.md §5.1 9 屏导航用） */
  id?: string
  /** 英文小帽 */
  eyebrow?: string
  /** 主标题 */
  title?: ReactNode
  /** 副标题 */
  subtitle?: ReactNode
  /** 标题 level，默认 h2 */
  titleLevel?: HeadingLevel
  /** 标题对齐 */
  align?: HeadingAlign
  /** 背景色 */
  background?: SectionBackground
  /** 容器宽度 */
  containerSize?: ContainerSize
  /** 是否使用大间距（py-20/py-32，用于 Hero 等大区段） */
  spacing?: 'normal' | 'large' | 'compact'
  children: ReactNode
}

const SPACING_CLASSES = {
  compact: 'py-12 md:py-16',
  normal: 'py-16 md:py-24',
  large: 'py-20 md:py-32'
} as const

/**
 * 项目统一 Section 容器
 * - 自动注入 Container（默认 xl）
 * - 可选 eyebrow + title + subtitle 双标题模式
 * - background 控制深色 / 工房色 / 米白等
 * - spacing 控制 padding 节奏（plan.md §1.4）
 */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  titleLevel = 2,
  align = 'left',
  background = 'default',
  containerSize = 'xl',
  spacing = 'normal',
  className,
  children,
  ...rest
}: SectionProps) {
  const hasHeader = !!(eyebrow || title || subtitle)

  return (
    <section
      id={id}
      className={cn(SPACING_CLASSES[spacing], BG_CLASSES[background], className)}
      {...rest}
    >
      <Container size={containerSize}>
        {hasHeader ? (
          <div className={cn('mb-10 md:mb-16', align === 'center' && 'mx-auto')}>
            <Heading
              level={titleLevel}
              size="section"
              align={align}
              eyebrow={eyebrow}
              subtitle={subtitle}
            >
              {title}
            </Heading>
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  )
}
