import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 className：clsx 处理条件 + tailwind-merge 解决 Tailwind 类冲突
 * 用法：cn('px-2', condition && 'px-4') → 'px-4'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
