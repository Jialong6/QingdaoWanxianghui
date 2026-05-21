import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Section, Container, Breadcrumb } from '@/components/ui'

type Params = { locale: string }

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
  const tMeta = await getTranslations({ locale, namespace: 'pages.leadTime' })
  return buildBaseMetadata(locale, { path: '/lead-time', title: tMeta('title') })
}

export default async function PlaceholderPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.leadTime')

  return (
    <Section
      eyebrow="LEAD TIME"
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
        <p className="text-body whitespace-pre-line text-neutral-700">{t('body')}</p>
      </Container>
    </Section>
  )
}
