import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface FormFieldProps {
  /** 字段 id（关联 label htmlFor 与控件 id） */
  htmlFor: string
  label: ReactNode
  required?: boolean
  /** 错误信息（存在时显示红色） */
  error?: string
  /** 帮助文本 */
  help?: ReactNode
  className?: string
  children: ReactNode
}

/**
 * 表单字段包装（design.md §3.2）
 * - label + 必填星号（error 色）
 * - 控件插槽
 * - help / error 文本
 */
export function FormField({
  htmlFor,
  label,
  required = false,
  error,
  help,
  className,
  children
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-neutral-700">
        {label}
        {required ? (
          <span className="ml-1 text-error" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      ) : help ? (
        <p className="text-xs text-neutral-500">{help}</p>
      ) : null}
    </div>
  )
}
