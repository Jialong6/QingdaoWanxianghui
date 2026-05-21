import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils/cn'

export type ImageAspect = '1:1' | '4:3' | '3:2' | '4:5' | '16:9' | '21:9'

const ASPECT_CLASSES: Record<ImageAspect, string> = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '3:2': 'aspect-[3/2]',
  '4:5': 'aspect-[4/5]',
  '16:9': 'aspect-video',
  '21:9': 'aspect-[21/9]'
}

type OptimizedImageBaseProps = {
  /** 显式比例容器（design.md §6：3:2 / 4:5 / 16:9 不混用） */
  aspect?: ImageAspect
  rounded?: boolean
  /** wrapper 额外 className */
  wrapperClassName?: string
  /** 包装 div 测试 hook */
  'data-testid'?: string
}

export type OptimizedImageProps = ImageProps & OptimizedImageBaseProps

/**
 * Next/Image 的项目封装（design.md §6 摄影规范）
 * - 强制 alt（TypeScript 已要求）
 * - 默认 sizes='(min-width: 1024px) 33vw, 100vw' 适合 3 列网格
 * - aspect 比例容器保持设计一致性
 */
export function OptimizedImage({
  aspect,
  rounded = false,
  wrapperClassName,
  className,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  alt,
  'data-testid': testId,
  ...rest
}: OptimizedImageProps) {
  return (
    <div
      data-testid={testId}
      className={cn(
        'relative overflow-hidden',
        aspect && ASPECT_CLASSES[aspect],
        rounded && 'rounded-md',
        wrapperClassName
      )}
    >
      <Image alt={alt} sizes={sizes} className={cn('object-cover', className)} {...rest} />
    </div>
  )
}
