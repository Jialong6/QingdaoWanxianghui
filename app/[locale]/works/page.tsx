import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Section, Container, Breadcrumb } from '@/components/ui'
import { WorksGrid } from '@/components/sections/WorksGrid'

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
  const tMeta = await getTranslations({ locale, namespace: 'home.works' })
  return buildBaseMetadata(locale, { path: '/works', title: tMeta('title') })
}

export default async function WorksPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('home.works')
  const tp = await getTranslations('pages.works')

  return (
    <Section
      eyebrow="WORKS"
      title={t('title')}
      subtitle={tp('intro')}
      background="subtle"
      containerSize="2xl"
    >
      <Container size="2xl" className="px-0">
        <Breadcrumb
          className="mb-10"
          items={[{ label: t('title'), href: '/' }, { label: tp('breadcrumb') }]}
        />
        <WorksGrid />
      </Container>
    </Section>
  )
}
