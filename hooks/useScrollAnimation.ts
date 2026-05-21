'use client'

import { useEffect, useState, useRef } from 'react'
import { buildAnimationClassName, type AnimationVariant } from '@/lib/animation'

/**
 * 检测系统是否设置了 prefers-reduced-motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

interface UseScrollAnimationOptions {
  variant?: AnimationVariant
  delay?: number
  threshold?: number
  disabled?: boolean
}

interface UseScrollAnimationResult {
  ref: React.RefObject<HTMLElement | null>
  isVisible: boolean
  animationClassName: string
}

/**
 * 滚动动画 Hook
 *
 * 使用 IntersectionObserver 检测元素是否进入视口，触发一次性入场动画。
 * - 进入后立即 unobserve（动画只触发一次）
 * - 尊重 prefers-reduced-motion
 * - 与 lib/animation.ts 的 buildAnimationClassName 协同
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationResult {
  const { variant = 'fade-in-up', delay, threshold = 0.1, disabled = false } = options

  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const shouldAnimate = !disabled && !prefersReducedMotion

  useEffect(() => {
    if (!shouldAnimate) {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [shouldAnimate, threshold])

  const animationClassName = buildAnimationClassName({
    variant,
    isVisible,
    delay,
    reducedMotion: prefersReducedMotion,
    disabled
  })

  return { ref, isVisible, animationClassName }
}
