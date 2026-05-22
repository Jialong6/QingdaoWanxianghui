import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb } from '@/components/ui'

type Params = { locale: string }

/** HTML sitemap 链接项：[路径, 翻译 key, 命名空间（默认 nav）] */
type LinkRow = [string, string, ('nav' | 'footer' | 'factory')?]
const LINKS: LinkRow[] = [
  ['/strength', 'strength'],
  ['/oem-flow', 'oemFlow'],
  ['/factory', 'factory'],
  ['/factory/qingdao', 'qingdao', 'factory'],
  ['/factory/shandong', 'shandong', 'factory'],
  ['/factory/myanmar', 'myanmar', 'factory'],
  ['/works', 'works'],
  ['/about', 'about'],
  ['/news', 'news'],
  ['/quality', 'quality', 'footer'],
  ['/lead-time', 'leadTime', 'footer'],
  ['/commercial', 'commercial', 'footer'],
  ['/sampling', 'sampling', 'footer'],
  ['/faq', 'faq', 'footer'],
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
  const tFooter = await getTranslations('footer')
  const tFactoryItems = await getTranslations('pages.factory.items')
  const label = (key: string, ns?: 'nav' | 'footer' | 'factory') => {
    if (ns === 'footer') return tFooter(key)
    if (ns === 'factory') return tFactoryItems(`${key}.name`)
    return tNav(key)
  }

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
          {LINKS.map(([href, key, ns]) => (
            <li key={href}>
              <Link
                href={href}
                className="text-primary-500 transition-colors hover:text-primary-700"
              >
                {label(key, ns)}
                <span className="ml-2 text-xs text-neutral-400">{href}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
