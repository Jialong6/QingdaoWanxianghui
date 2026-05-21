import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'accent',
  'ghost',
  'link',
  'danger'
] as const
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]

export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type ButtonSize = (typeof BUTTON_SIZES)[number]

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-neutral-0 hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:-translate-y-px',
  secondary:
    'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
  accent:
    'bg-accent-500 text-neutral-900 hover:bg-accent-600 active:bg-accent-700 shadow-sm hover:-translate-y-px',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
  link: 'bg-transparent text-primary-500 underline-offset-4 underline hover:text-primary-700 px-0',
  danger:
    'bg-error text-neutral-0 hover:opacity-90 active:opacity-100 shadow-sm hover:-translate-y-px'
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: 'h-7 py-1 px-3 text-xs gap-1.5',
  sm: 'h-9 py-2 px-4 text-sm gap-2',
  md: 'h-11 py-3 px-6 text-base gap-2',
  lg: 'h-13 py-4 px-8 text-lg gap-2.5',
  xl: 'h-15 py-5 px-10 text-xl gap-3'
}

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded font-medium transition-all duration-base ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
      {...rest}
    >
      {loading ? <Spinner /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  )
})

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  )
}
