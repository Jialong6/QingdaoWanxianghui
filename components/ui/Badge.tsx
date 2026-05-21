import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export const BADGE_VARIANTS = [
  'default',
  'primary',
  'accent',
  'success',
  'warning',
  'error'
] as const
export type BadgeVariant = (typeof BADGE_VARIANTS)[number]

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-primary-50 text-primary-700',
  accent: 'bg-accent-50 text-accent-700',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error'
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

/**
 * 项目统一 Badge / Tag（design.md §3.5）
 * - 高度 24px，px-2.5 py-0.5
 * - 字号 text-xs，字重 500
 */
export function Badge({ variant = 'default', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium',
        VARIANT_CLASSES[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
