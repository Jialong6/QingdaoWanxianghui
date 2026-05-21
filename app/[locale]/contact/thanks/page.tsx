import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Section } from '@/components/ui'
import { Link } from '@/lib/i18n/routing'

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
  const tMeta = await getTranslations({ locale, namespace: 'inquiry.thanks' })
  return buildBaseMetadata(locale, { path: '/contact/thanks', title: tMeta('title') })
}

/** 通用成功页：catalog / visit / sample 三表单提交后共用（复用 inquiry.thanks 文案） */
export default async function ContactThanksPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('inquiry.thanks')

  return (
    <Section background="subtle" spacing="large" containerSize="prose">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl text-success">
          ✓
        </div>
        <h1 className="heading-section">{t('title')}</h1>
        <p className="mt-4 text-body">{t('body')}</p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 transition-colors hover:text-primary-700"
          >
            <span aria-hidden="true">←</span> {t('backHome')}
          </Link>
        </div>
      </div>
    </Section>
  )
}
