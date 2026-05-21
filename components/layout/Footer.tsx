import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Container } from '@/components/ui'
import { Logo } from './Logo'

interface FooterLink {
  i18nKey: string
  href: string
  external?: boolean
}

const COMPANY_LINKS: FooterLink[] = [
  { i18nKey: 'companyProfile', href: '/about' },
  // about 为单页整合（概要+沿革+代表挨拶），子路由指向锚点
  { i18nKey: 'message', href: '/about' },
  { i18nKey: 'history', href: '/about' },
  { i18nKey: 'careers', href: '/careers' }
]

const SERVICE_LINKS: FooterLink[] = [
  { i18nKey: 'oemFlow', href: '/oem-flow' },
  { i18nKey: 'quality', href: '/quality' },
  { i18nKey: 'leadTime', href: '/lead-time' },
  { i18nKey: 'commercial', href: '/commercial' },
  { i18nKey: 'sampling', href: '/sampling' },
  { i18nKey: 'factory', href: '/factory' }
]

const PRODUCT_LINKS: FooterLink[] = [
  { i18nKey: 'backpack', href: '/works?category=backpack' },
  { i18nKey: 'tote', href: '/works?category=tote' },
  { i18nKey: 'business', href: '/works?category=business' },
  { i18nKey: 'student', href: '/works?category=student' }
]

const RESOURCE_LINKS: FooterLink[] = [
  { i18nKey: 'catalog', href: '/contact/catalog' },
  { i18nKey: 'faq', href: '/faq' },
  { i18nKey: 'contact', href: '/contact' },
  { i18nKey: 'visit', href: '/contact/visit' }
]

// XXX: 待客户提供真实社交账号 URL
const SOCIAL_LINKS: FooterLink[] = [
  { i18nKey: 'instagram', href: '#', external: true },
  { i18nKey: 'linkedin', href: '#', external: true },
  { i18nKey: 'wechat', href: '#', external: true }
]

/**
 * Footer（design.md §2.2）
 * - bg primary-900 / 文字 neutral-100 + neutral-300
 * - py-16 上下内边距
 * - 5 栏 + 双工厂地址 + 法务版权
 */
export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  const groups = [
    { title: t('company'), links: COMPANY_LINKS },
    { title: t('services'), links: SERVICE_LINKS },
    { title: t('products'), links: PRODUCT_LINKS },
    { title: t('resources'), links: RESOURCE_LINKS },
    { title: t('social'), links: SOCIAL_LINKS }
  ]

  return (
    <footer
      role="contentinfo"
      className="border-t border-primary-700 bg-primary-900 py-16 text-neutral-300"
    >
      <Container size="2xl">
        {/* 5 栏链接 */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="light" />
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-en-sans text-2xs font-medium uppercase text-neutral-100 tracking-[0.2em]">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {group.links.map((l) => (
                  <li key={l.i18nKey}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-300 transition-colors hover:text-neutral-0"
                      >
                        {t(l.i18nKey)}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-neutral-300 transition-colors hover:text-neutral-0"
                      >
                        {t(l.i18nKey)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 工厂地址 */}
        <div className="mt-12 border-t border-primary-700 pt-8">
          <p className="mb-4 font-en-sans text-2xs font-medium uppercase text-neutral-100 tracking-[0.2em]">
            {t('addressesTitle')}
          </p>
          <div className="grid gap-6 text-sm md:grid-cols-3">
            {(['qingdao', 'shandong', 'myanmar'] as const).map((key) => (
              <div key={key}>
                <p className="font-medium text-neutral-100">{t(`${key}Label`)}</p>
                <p className="mt-1 text-neutral-300">{t(`${key}Address`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 版权 + 法务 */}
        <div className="mt-12 flex flex-col gap-4 border-t border-primary-700 pt-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-neutral-0">
                {tNav('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-neutral-0">
                {tNav('terms')}
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-neutral-0">
                {tNav('sitemap')}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
