import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
}

/**
 * 复选框（design.md §3.4）
 * - 18px + primary 选中 + label
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, ...rest },
  ref
) {
  return (
    <label htmlFor={id} className={cn('flex cursor-pointer items-start gap-2', className)}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 rounded border-neutral-300 text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        {...rest}
      />
      <span className="text-sm leading-relaxed text-neutral-700">{label}</span>
    </label>
  )
})
