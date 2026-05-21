import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export const CONTAINER_SIZES = ['sm', 'md', 'lg', 'xl', '2xl', 'prose', 'narrow'] as const
export type ContainerSize = (typeof CONTAINER_SIZES)[number]

const SIZE_CLASSES: Record<ContainerSize, string> = {
  sm: 'max-w-container-sm',
  md: 'max-w-container-md',
  lg: 'max-w-container-lg',
  xl: 'max-w-container-xl',
  '2xl': 'max-w-container-2xl',
  prose: 'max-w-container-prose',
  narrow: 'max-w-container-narrow'
}

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  size?: ContainerSize
  as?: ElementType
  children: ReactNode
}

/**
 * 项目统一容器
 * - 默认 max-width = container-xl (1200px)
 * - 内边距：移动 px-4 / 中 px-8 / 大 px-12
 * - 居中：mx-auto
 */
export function Container({
  size = 'xl',
  as = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return createElement(
    as,
    {
      className: cn('mx-auto w-full px-4 md:px-8 xl:px-12', SIZE_CLASSES[size], className),
      ...rest
    },
    children
  )
}
