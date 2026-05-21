import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  options: SelectOption[]
  placeholder?: string
}

/**
 * 下拉选择（design.md §3.3）
 * - 原生 select + 右侧 ↓ 图标
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error = false, options, placeholder, className, ...rest },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          'h-11 w-full appearance-none rounded border bg-neutral-0 px-3 py-2.5 pr-9 text-base text-neutral-900',
          'transition-colors duration-base',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          'disabled:cursor-not-allowed disabled:bg-neutral-50',
          error ? 'border-error focus-visible:ring-error' : 'border-neutral-300',
          className
        )}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
      >
        ↓
      </span>
    </div>
  )
})
