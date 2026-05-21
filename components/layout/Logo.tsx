import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { cn } from '@/lib/utils/cn'

type LogoSize = 'sm' | 'md' | 'lg'
type LogoVariant = 'dark' | 'light'

const SIZE_CLASSES: Record<LogoSize, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl'
}

const VARIANT_CLASSES: Record<LogoVariant, string> = {
  dark: 'text-neutral-900 hover:text-primary-500',
  light: 'text-neutral-0 hover:text-neutral-100'
}

export interface LogoProps {
  size?: LogoSize
  variant?: LogoVariant
  className?: string
}

/**
 * Wordmark Logo（暂用纯文字，待品牌 Logo 设计上线后替换）
 * - design.md §2.1：左侧 h-8 (移动) / h-10 (PC)
 * - dark 用于 navbar；light 用于深色 footer
 */
export function Logo({ size = 'md', variant = 'dark', className }: LogoProps) {
  const t = useTranslations('meta')
  const siteName = t('siteName')

  return (
    <Link
      href="/"
      aria-label={`${siteName} - ${t('siteTagline')}`}
      className={cn(
        'inline-flex items-center font-jp-sans font-bold tracking-[0.02em] transition-colors duration-base',
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {siteName}
    </Link>
  )
}
