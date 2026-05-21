import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Section, Container, Breadcrumb } from '@/components/ui'
import { CatalogForm } from '@/components/sections/CatalogForm'

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
  const tMeta = await getTranslations({ locale, namespace: 'catalog' })
  return buildBaseMetadata(locale, { path: '/contact/catalog', title: tMeta('title') })
}

export default async function CatalogPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('catalog')

  return (
    <Section
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      background="subtle"
      containerSize="prose"
    >
      <Container size="prose" className="px-0">
        <Breadcrumb
          className="mb-8"
          items={[{ label: t('breadcrumbHome'), href: '/' }, { label: t('breadcrumb') }]}
        />
        <CatalogForm />
      </Container>
    </Section>
  )
}
