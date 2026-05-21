import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb } from '@/components/ui'

type Params = { locale: string }

/** HTML sitemap 链接项：[路径, nav 翻译 key] */
const LINKS: Array<[string, string]> = [
  ['/strength', 'strength'],
  ['/oem-flow', 'oemFlow'],
  ['/factory', 'factory'],
  ['/works', 'works'],
  ['/about', 'about'],
  ['/news', 'news'],
  ['/contact', 'contact'],
  ['/contact/inquiry', 'contact'],
  ['/contact/catalog', 'catalog'],
  ['/contact/visit', 'contact'],
  ['/contact/sample', 'contact'],
  ['/privacy', 'privacy'],
  ['/terms', 'terms']
]

export function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'en' }, { locale: 'zh' }]
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const tMeta = await getTranslations({ locale, namespace: 'pages.sitemap' })
  return buildBaseMetadata(locale, { path: '/sitemap', title: tMeta('title') })
}

export default async function SitemapPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.sitemap')
  const tNav = await getTranslations('nav')

  return (
    <Section
      eyebrow="SITEMAP"
      title={t('title')}
      subtitle={t('intro')}
      background="subtle"
      containerSize="prose"
    >
      <Container size="prose" className="px-0">
        <Breadcrumb
          className="mb-8"
          items={[{ label: t('title'), href: '/' }, { label: t('breadcrumb') }]}
        />
        <ul className="space-y-3">
          {LINKS.map(([href, key]) => (
            <li key={href}>
              <Link
                href={href}
                className="text-primary-500 transition-colors hover:text-primary-700"
              >
                {tNav(key)}
                <span className="ml-2 text-xs text-neutral-400">{href}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
