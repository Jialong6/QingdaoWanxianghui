'use client'

import { useRef, useState, type ChangeEvent } from 'react'
import { cn } from '@/lib/utils/cn'
import {
  validateFile,
  ALLOWED_EXTENSIONS,
  MAX_FILES,
  type UploadErrorCode
} from '@/lib/validations/upload'

export interface FileUploadProps {
  value: File[]
  onChange: (files: File[]) => void
  /** 翻译错误 code → 文案 */
  renderError?: (code: UploadErrorCode) => string
  /** 帮助文本（如 "PDF/JPG/PNG/AI/PSD・最大 10MB・5 ファイルまで"） */
  id?: string
  className?: string
  error?: boolean
}

const ACCEPT = ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(',')

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * 文件上传（design.md §3 表单延伸 / plan.md §5.13.2）
 * - 受控组件：value: File[] / onChange
 * - 客户端校验（大小 / 类型 / 数量），错误内联提示
 * - 文件列表 + 删除
 */
export function FileUpload({
  value,
  onChange,
  renderError,
  id,
  className,
  error = false
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentError, setCurrentError] = useState<UploadErrorCode | null>(null)

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? [])
    let nextError: UploadErrorCode | null = null

    const accepted: File[] = [...value]
    for (const f of picked) {
      if (accepted.length >= MAX_FILES) {
        nextError = 'tooManyFiles'
        break
      }
      const code = validateFile({ name: f.name, size: f.size, type: f.type })
      if (code) {
        nextError = code
        continue
      }
      accepted.push(f)
    }
    setCurrentError(nextError)
    onChange(accepted)
    // 重置 input 以便重复选同名文件
    if (inputRef.current) inputRef.current.value = ''
  }

  const removeAt = (idx: number) => {
    setCurrentError(null)
    onChange(value.filter((_, i) => i !== idx))
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded border border-dashed px-4 py-8 text-center transition-colors',
          error || currentError
            ? 'border-error bg-error/5'
            : 'border-neutral-300 hover:border-primary-500 hover:bg-primary-50'
        )}
      >
        <span aria-hidden="true" className="text-2xl text-neutral-400">
          ↑
        </span>
        <span className="text-sm text-neutral-600">
          {ALLOWED_EXTENSIONS.map((e) => e.toUpperCase()).join(' / ')}・max 10MB・{MAX_FILES} files
        </span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept={ACCEPT}
          onChange={handleSelect}
          className="sr-only"
        />
      </label>

      {currentError && renderError ? (
        <p className="text-xs text-error" role="alert">
          {renderError(currentError)}
        </p>
      ) : null}

      {value.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {value.map((f, idx) => (
            <li
              key={`${f.name}-${idx}`}
              className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-0 px-3 py-2 text-sm"
            >
              <span className="truncate text-neutral-700">
                {f.name} <span className="text-neutral-400">({formatSize(f.size)})</span>
              </span>
              <button
                type="button"
                aria-label={`remove ${f.name}`}
                onClick={() => removeAt(idx)}
                className="ml-3 flex-shrink-0 rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-error"
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
