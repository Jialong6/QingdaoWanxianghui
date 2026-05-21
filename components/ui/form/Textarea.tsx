import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

/**
 * 多行文本（design.md §3.2）
 * - 同 Input 外观，min-h 增加
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { error = false, className, rows = 5, ...rest },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={error || undefined}
      className={cn(
        'w-full rounded border bg-neutral-0 px-3 py-2.5 text-base leading-relaxed text-neutral-900',
        'placeholder:text-neutral-400',
        'transition-colors duration-base',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'disabled:cursor-not-allowed disabled:bg-neutral-50',
        error ? 'border-error focus-visible:ring-error' : 'border-neutral-300',
        className
      )}
      {...rest}
    />
  )
})
