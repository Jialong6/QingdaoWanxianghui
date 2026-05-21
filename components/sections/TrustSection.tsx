import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui'
import { MEDIA_COVERAGES, CUSTOMER_SEGMENTS, CERTIFICATIONS } from '@/lib/content/mock/trust'

/**
 * 屏 8：信頼の声 / 媒体掲載 / 認証（plan.md §5.1）
 * - 3 个子区块：媒体 logo 墙 / 客户业种 / 认证
 */
export function TrustSection() {
  const t = useTranslations('home.trust')
  const customers = useTranslations('home.trust.customers')
  const cert = useTranslations('home.trust.cert')

  return (
    <Section
      id="trust"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      background="subtle"
      containerSize="2xl"
    >
      <div className="space-y-16">
        {/* 媒体掲載 */}
        <div>
          <h3 className="text-center font-en-sans text-2xs font-medium uppercase text-neutral-500 tracking-[0.2em]">
            {t('mediaTitle')}
          </h3>
          <div className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-6">
            {MEDIA_COVERAGES.map((m) => (
              <div
                key={m.id}
                className="flex h-16 items-center justify-center rounded bg-neutral-0 text-xs font-medium text-neutral-400"
                title={m.name}
              >
                {/* XXX-TODO: 替换为真实媒体 logo */}
                {m.name}
              </div>
            ))}
          </div>
        </div>

        {/* 客户业种 */}
        <div>
          <h3 className="text-center font-en-sans text-2xs font-medium uppercase text-neutral-500 tracking-[0.2em]">
            {t('customerTitle')}
          </h3>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {CUSTOMER_SEGMENTS.map((c) => (
              <li
                key={c.id}
                className="rounded-full bg-neutral-0 px-5 py-2 text-sm font-medium text-neutral-700 shadow-sm"
              >
                {customers(c.labelKey)}
              </li>
            ))}
          </ul>
        </div>

        {/* 认证 */}
        <div>
          <h3 className="text-center font-en-sans text-2xs font-medium uppercase text-neutral-500 tracking-[0.2em]">
            {t('certTitle')}
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {CERTIFICATIONS.map((c) => (
              <div key={c.id} className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-0 text-xs font-medium text-neutral-400 shadow-sm">
                  {/* XXX-TODO: 替换为真实认证图 */}
                  {cert(c.nameKey)}
                </div>
                <p className="mt-2 text-xs text-neutral-500">{cert(c.nameKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
