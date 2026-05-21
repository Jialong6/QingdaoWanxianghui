/**
 * 动效变体（与 design.md §9 + §1.7 对齐）
 * 严格控制：≤ 400ms 常规、≤ 600ms hero
 */

export const ANIMATION_VARIANTS = ['fade-in', 'fade-in-up', 'slide-in-right'] as const

export type AnimationVariant = (typeof ANIMATION_VARIANTS)[number]

interface BuildAnimationClassNameOptions {
  variant: AnimationVariant
  isVisible: boolean
  delay?: number
  reducedMotion?: boolean
  disabled?: boolean
}

const VARIANT_TO_CLASS: Record<AnimationVariant, string> = {
  'fade-in': 'animate-fade-in',
  'fade-in-up': 'animate-fade-in-up',
  'slide-in-right': 'animate-slide-in-right'
}

const HIDDEN_BASE_CLASS: Record<AnimationVariant, string> = {
  'fade-in': 'opacity-0',
  'fade-in-up': 'opacity-0 translate-y-4',
  'slide-in-right': 'opacity-0 -translate-x-3'
}

/**
 * 生成 Tailwind 动效类名
 * - 未进入视口：保持隐藏初始态
 * - 已进入：触发对应 animation
 * - 偏好减少动画 / 禁用 / SSR 都返回最终态（无动画）
 */
export function buildAnimationClassName({
  variant,
  isVisible,
  delay = 0,
  reducedMotion = false,
  disabled = false
}: BuildAnimationClassNameOptions): string {
  if (disabled || reducedMotion) {
    return ''
  }
  if (!isVisible) {
    return `${HIDDEN_BASE_CLASS[variant]} transition-none`
  }
  const delayClass = delay > 0 ? `[animation-delay:${delay}ms]` : ''
  return `${VARIANT_TO_CLASS[variant]} ${delayClass}`.trim()
}
