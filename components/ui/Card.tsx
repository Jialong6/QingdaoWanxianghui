import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4 md:p-5',
  md: 'p-6 md:p-7',
  lg: 'p-6 md:p-8'
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  hoverable?: boolean
  padding?: CardPadding
  children: ReactNode
}

interface CardComponent {
  (props: CardProps): JSX.Element
  Body: typeof CardBody
}

/**
 * 卡片基础容器（design.md §3.6）
 * - 默认 neutral-0 背景 + 1px neutral-200 边框 + rounded-md + shadow-sm
 * - hoverable=true 时 hover 抬升 + 阴影加深
 * - 复合组件：<Card.Body>
 */
function CardImpl({
  as = 'div',
  hoverable = false,
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return createElement(
    as,
    {
      className: cn(
        'bg-neutral-0 border border-neutral-200 rounded-md shadow-sm',
        PADDING_CLASSES[padding],
        hoverable &&
          'transition-all duration-base ease-in-out hover:shadow-md hover:-translate-y-0.5',
        className
      ),
      ...rest
    },
    children
  )
}

function CardBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 md:p-8', className)} {...rest}>
      {children}
    </div>
  )
}

export const Card = CardImpl as CardComponent
Card.Body = CardBody
