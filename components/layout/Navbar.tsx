'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/i18n/routing'
import { MAIN_NAV } from '@/lib/navigation'
import { useScrollState, useMobileMenu } from '@/hooks/useNavigation'
import { Button, Container, LanguageSwitcher } from '@/components/ui'
import { cn } from '@/lib/utils/cn'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

/**
 * Navbar（design.md §2.1）
 * - 高度 72px (md+) / 56px (mobile)
 * - 滚动 > 32px：背景 rgba(255,255,255,0.92) + backdrop-blur
 * - 当前页：text-primary-500 + 2px 下划线
 * - 移动端：折叠为 hamburger 触发 <MobileMenu>
 */
export function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const isScrolled = useScrollState()
  const mobileMenu = useMobileMenu()

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-fixed h-14 md:h-18',
          'border-b border-neutral-100 transition-all duration-base',
          isScrolled
            ? 'bg-neutral-0/90 backdrop-blur supports-[backdrop-filter]:bg-neutral-0/75'
            : 'bg-neutral-0'
        )}
        role="banner"
      >
        <Container size="2xl" className="flex h-full items-center justify-between gap-4">
          <Logo size="md" />

          {/* 桌面主导航 */}
          <nav aria-label="primary" className="hidden flex-1 lg:flex lg:justify-center">
            <ul className="flex items-center gap-1">
              {MAIN_NAV.slice(0, 6).map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))
                const i18nKey = item.i18nKey.replace(/^nav\./, '')
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative inline-block px-3 py-2 text-sm font-medium transition-colors duration-base',
                        'after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px]',
                        'after:bg-primary-500 after:scale-x-0 after:origin-left',
                        'after:transition-transform after:duration-base hover:after:scale-x-100',
                        isActive
                          ? 'text-primary-500 after:scale-x-100'
                          : 'text-neutral-700 hover:text-primary-500'
                      )}
                    >
                      {t(i18nKey)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden md:flex" showLabel={false} />
            <Link
              href="/contact/catalog"
              className="hidden lg:inline-flex"
            >
              <Button variant="secondary" size="sm" type="button">
                {t('catalog')}
              </Button>
            </Link>
            <Link
              href="/contact/inquiry"
              className="hidden md:inline-flex"
            >
              <Button variant="primary" size="sm" type="button">
                {t('contact')}
              </Button>
            </Link>

            {/* 移动 hamburger */}
            <button
              type="button"
              aria-label={mobileMenu.isOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileMenu.isOpen}
              aria-controls="mobile-menu"
              onClick={mobileMenu.toggle}
              className="inline-flex h-10 w-10 items-center justify-center rounded text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 lg:hidden"
            >
              <HamburgerIcon open={mobileMenu.isOpen} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileMenu.isOpen}
        onClose={mobileMenu.close}
        menuRef={mobileMenu.menuRef}
      />

      {/* 占位：避免内容被 fixed header 遮挡 */}
      <div className="h-14 md:h-18" aria-hidden="true" />
    </>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-5 w-6">
      <span
        className={cn(
          'absolute left-0 top-1 h-[2px] w-full bg-current transition-all duration-base',
          open && 'top-1/2 -translate-y-1/2 rotate-45'
        )}
      />
      <span
        className={cn(
          'absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current transition-opacity duration-base',
          open && 'opacity-0'
        )}
      />
      <span
        className={cn(
          'absolute bottom-1 left-0 h-[2px] w-full bg-current transition-all duration-base',
          open && 'bottom-1/2 translate-y-1/2 -rotate-45'
        )}
      />
    </span>
  )
}
