import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

/**
 * 文本输入框（design.md §3.2）
 * - h-11 / border neutral-300 / rounded / focus ring
 * - error 态：border-error
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error = false, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        'h-11 w-full rounded border bg-neutral-0 px-3 py-2.5 text-base text-neutral-900',
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
