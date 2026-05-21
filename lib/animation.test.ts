import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import {
  buildAnimationClassName,
  ANIMATION_VARIANTS,
  type AnimationVariant
} from './animation'

describe('buildAnimationClassName', () => {
  describe('单测', () => {
    it('reducedMotion 时返回空字符串', () => {
      expect(
        buildAnimationClassName({ variant: 'fade-in', isVisible: true, reducedMotion: true })
      ).toBe('')
    })

    it('disabled 时返回空字符串', () => {
      expect(
        buildAnimationClassName({ variant: 'fade-in', isVisible: true, disabled: true })
      ).toBe('')
    })

    it('未进入视口时返回初始隐藏态 + transition-none', () => {
      const result = buildAnimationClassName({ variant: 'fade-in-up', isVisible: false })
      expect(result).toContain('opacity-0')
      expect(result).toContain('transition-none')
    })

    it('已进入视口时返回 animate-* 类', () => {
      expect(buildAnimationClassName({ variant: 'fade-in', isVisible: true })).toContain(
        'animate-fade-in'
      )
      expect(
        buildAnimationClassName({ variant: 'fade-in-up', isVisible: true })
      ).toContain('animate-fade-in-up')
      expect(
        buildAnimationClassName({ variant: 'slide-in-right', isVisible: true })
      ).toContain('animate-slide-in-right')
    })

    it('delay > 0 时附带 animation-delay 类', () => {
      const result = buildAnimationClassName({
        variant: 'fade-in',
        isVisible: true,
        delay: 200
      })
      expect(result).toContain('[animation-delay:200ms]')
    })

    it('delay = 0 时不附带 delay 类', () => {
      const result = buildAnimationClassName({
        variant: 'fade-in',
        isVisible: true,
        delay: 0
      })
      expect(result).not.toContain('[animation-delay')
    })
  })

  describe('property-based', () => {
    const variantArb = fc.constantFrom<AnimationVariant>(...ANIMATION_VARIANTS)

    it('Property: reducedMotion=true 任意输入都返回空串', () => {
      fc.assert(
        fc.property(
          variantArb,
          fc.boolean(),
          fc.integer({ min: 0, max: 1000 }),
          (variant, isVisible, delay) => {
            expect(
              buildAnimationClassName({ variant, isVisible, delay, reducedMotion: true })
            ).toBe('')
          }
        ),
        { numRuns: 50 }
      )
    })

    it('Property: 任意有效 variant + isVisible=true + 启用动画 → 返回非空且含 animate-', () => {
      fc.assert(
        fc.property(variantArb, (variant) => {
          const result = buildAnimationClassName({ variant, isVisible: true })
          expect(result.length).toBeGreaterThan(0)
          expect(result).toContain('animate-')
        }),
        { numRuns: 30 }
      )
    })

    it('Property: isVisible=false 时永远不含 animate-* 类', () => {
      fc.assert(
        fc.property(variantArb, fc.integer({ min: 0, max: 1000 }), (variant, delay) => {
          const result = buildAnimationClassName({ variant, isVisible: false, delay })
          expect(result).not.toMatch(/animate-/)
        }),
        { numRuns: 30 }
      )
    })
  })
})
