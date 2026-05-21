import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Section, Container, Breadcrumb, Heading } from '@/components/ui'
import { PROFILE_ROWS, HISTORY } from '@/lib/content/mock/about'

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
  const tMeta = await getTranslations({ locale, namespace: 'nav' })
  return buildBaseMetadata(locale, { path: '/about', title: tMeta('about') })
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.about')
  const tNav = await getTranslations('nav')

  return (
    <Section
      eyebrow="ABOUT"
      title={tNav('about')}
      subtitle={t('intro')}
      background="subtle"
      containerSize="lg"
    >
      <Container size="lg" className="px-0">
        <Breadcrumb
          className="mb-10"
          items={[{ label: tNav('about'), href: '/' }, { label: t('breadcrumb') }]}
        />

        {/* 会社概要 */}
        <Heading level={2} size="sub" className="mb-6">
          {t('profileTitle')}
        </Heading>
        <dl className="mb-16 divide-y divide-neutral-200 border-y border-neutral-200">
          {PROFILE_ROWS.map((row) => (
            <div key={row} className="grid gap-1 py-4 md:grid-cols-[180px_1fr] md:gap-6">
              <dt className="text-sm font-medium text-neutral-500">
                {t(`profile.${row}.label`)}
              </dt>
              <dd className="text-sm text-neutral-800">{t(`profile.${row}.value`)}</dd>
            </div>
          ))}
        </dl>

        {/* 沿革 */}
        <Heading level={2} size="sub" className="mb-6">
          {t('historyTitle')}
        </Heading>
        <ol className="mb-16 relative border-l border-neutral-200 pl-8">
          {HISTORY.map((h) => (
            <li key={h.year} className="relative mb-6 last:mb-0">
              <span className="absolute -left-[37px] top-1 h-3 w-3 rounded-full bg-primary-500" />
              <p className="font-en-sans text-lg font-bold text-primary-700 tabular-nums">
                {h.year}
              </p>
              <p className="mt-1 text-sm text-neutral-700">{t(`history.${h.labelKey}`)}</p>
            </li>
          ))}
        </ol>

        {/* 代表挨拶 */}
        <Heading level={2} size="sub" className="mb-6">
          {t('messageTitle')}
        </Heading>
        <blockquote className="border-l-2 border-primary-500 pl-6">
          <p className="text-body whitespace-pre-line text-neutral-700">{t('message.body')}</p>
          <footer className="mt-4 text-sm font-medium text-neutral-900">
            {t('message.signature')}
          </footer>
        </blockquote>
      </Container>
    </Section>
  )
}
