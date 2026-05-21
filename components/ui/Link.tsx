import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link as IntlLink } from '@/lib/i18n/routing'
import { cn } from '@/lib/utils/cn'

export const LINK_VARIANTS = ['default', 'primary', 'muted', 'inverse'] as const
export type LinkVariant = (typeof LINK_VARIANTS)[number]

const VARIANT_CLASSES: Record<LinkVariant, string> = {
  default: 'text-neutral-700 hover:text-primary-500',
  primary: 'text-primary-500 hover:text-primary-700',
  muted: 'text-neutral-500 hover:text-neutral-700',
  inverse: 'text-neutral-0 hover:text-neutral-100'
}

interface BaseProps {
  href: string
  children: ReactNode
  variant?: LinkVariant
  underline?: boolean
  className?: string
}

interface InternalLinkProps extends BaseProps {
  external?: false
}

interface ExternalLinkProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'> {
  external: true
}

export type LinkProps = InternalLinkProps | ExternalLinkProps

/**
 * 项目统一 Link 组件
 * - 内部链接走 next-intl Link（保持当前 locale）
 * - 外部链接（external=true）走原生 <a> + rel="noopener noreferrer" + target="_blank"
 */
export function Link(props: LinkProps) {
  const {
    href,
    children,
    variant = 'default',
    underline = false,
    className,
    external,
    ...rest
  } = props

  const cls = cn(
    'transition-colors duration-base ease-in-out',
    VARIANT_CLASSES[variant],
    underline && 'underline underline-offset-4',
    className
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <IntlLink href={href} className={cls}>
      {children}
    </IntlLink>
  )
}
