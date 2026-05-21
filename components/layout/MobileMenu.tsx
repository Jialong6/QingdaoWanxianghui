'use client'

import type { RefObject } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/i18n/routing'
import { MAIN_NAV } from '@/lib/navigation'
import { Button, LanguageSwitcher } from '@/components/ui'
import { cn } from '@/lib/utils/cn'

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuRef: RefObject<HTMLDivElement | null>
}

/**
 * 移动端 Drawer 菜单（design.md §2.1 移动端）
 * - 从右侧滑入 80% 宽度
 * - 顶部 logo + 关闭按钮
 * - 7 项导航纵向 + 语言切换 + 大 CTA
 * - 用 useMobileMenu hook 提供 ESC + body lock 行为（外部传入 isOpen/onClose）
 */
export function MobileMenu({ isOpen, onClose, menuRef }: MobileMenuProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()

  return (
    <>
      {/* 遮罩 */}
      <button
        type="button"
        aria-label={t('closeMenu')}
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-modal-bg bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-base lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef as React.Ref<HTMLDivElement>}
        role="dialog"
        aria-modal={isOpen ? 'true' : undefined}
        aria-hidden={isOpen ? undefined : 'true'}
        className={cn(
          'fixed right-0 top-0 z-modal h-full w-4/5 max-w-xs bg-neutral-0 shadow-xl',
          'flex flex-col transition-transform duration-base ease-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-14 items-center justify-end border-b border-neutral-100 px-4">
          <button
            type="button"
            aria-label={t('closeMenu')}
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded text-neutral-700 hover:bg-neutral-100"
          >
            <span aria-hidden="true" className="text-xl">×</span>
          </button>
        </div>

        <nav aria-label="mobile primary" className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="flex flex-col gap-1">
            {MAIN_NAV.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              const i18nKey = item.i18nKey.replace(/^nav\./, '')
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'block rounded px-3 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-500'
                    )}
                  >
                    {t(i18nKey)}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 border-t border-neutral-100 pt-6">
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="border-t border-neutral-100 p-4">
          <Link href="/contact/inquiry" onClick={onClose} className="block">
            <Button variant="primary" size="md" type="button" className="w-full">
              {t('contact')}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
