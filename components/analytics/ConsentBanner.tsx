'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Button } from '@/components/ui/Button'
import { useConsent } from './ConsentProvider'

/**
 * Cookie / 分析同意横幅（APPI + GDPR）
 * - 仅在「未决定」时显示；同意/拒绝后由 localStorage 记忆，不再显示
 * - 固定底部，不遮挡主 CTA；分析脚本仅在「同意」后加载（见 Analytics）
 */
export function ConsentBanner() {
  const t = useTranslations('consent')
  const { consent, setConsent } = useConsent()

  if (consent !== null) return null

  return (
    <div
      role="dialog"
      aria-label={t('label')}
      className="fixed inset-x-0 bottom-0 z-modal border-t border-neutral-200 bg-neutral-0/95 px-4 py-4 shadow-lg backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-700">
          {t('message')}{' '}
          <Link href="/privacy" className="text-primary-500 underline underline-offset-2">
            {t('privacyLink')}
          </Link>
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <Button variant="ghost" size="sm" onClick={() => setConsent('denied')}>
            {t('reject')}
          </Button>
          <Button variant="primary" size="sm" onClick={() => setConsent('granted')}>
            {t('accept')}
          </Button>
        </div>
      </div>
    </div>
  )
}
