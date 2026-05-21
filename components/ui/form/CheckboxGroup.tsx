import { cn } from '@/lib/utils/cn'

export interface CheckboxOption {
  value: string
  label: string
}

export interface CheckboxGroupProps {
  options: CheckboxOption[]
  /** 当前选中值数组 */
  value: string[]
  onChange: (next: string[]) => void
  name?: string
  error?: boolean
  className?: string
}

/**
 * 多选组（design.md §3.4）— 用于製品カテゴリー多选
 * - 受控组件，value/onChange 由外部（RHF Controller）管理
 */
export function CheckboxGroup({
  options,
  value,
  onChange,
  name,
  error = false,
  className
}: CheckboxGroupProps) {
  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }

  return (
    <div
      role="group"
      aria-invalid={error || undefined}
      className={cn('flex flex-wrap gap-3', className)}
    >
      {options.map((o) => {
        const checked = value.includes(o.value)
        return (
          <label
            key={o.value}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded border px-4 py-2 text-sm transition-colors',
              checked
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            )}
          >
            <input
              type="checkbox"
              name={name}
              value={o.value}
              checked={checked}
              onChange={() => toggle(o.value)}
              className="h-[18px] w-[18px] rounded border-neutral-300 text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            />
            {o.label}
          </label>
        )
      })}
    </div>
  )
}
