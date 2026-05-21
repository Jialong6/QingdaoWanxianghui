import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('合并字符串数组', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('过滤 falsy 值', () => {
    expect(cn('a', false, null, undefined, '', 'b')).toBe('a b')
  })

  it('支持条件对象', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })

  it('后置 Tailwind 类覆盖前置', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('处理颜色冲突时取后者', () => {
    expect(cn('text-neutral-500', 'text-primary-700')).toBe('text-primary-700')
  })

  it('空输入返回空字符串', () => {
    expect(cn()).toBe('')
  })
})
