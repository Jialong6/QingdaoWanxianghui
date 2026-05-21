import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/lib/i18n/routing'
import { isLocale, LOCALE_HTML_LANG, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Navbar, Footer, FloatingContact, LocaleSuggestionBanner } from '@/components/layout'
import '../globals.css'

type Params = { locale: string }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildBaseMetadata(locale)
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<Params>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const messages = await getMessages()
  const htmlLang = LOCALE_HTML_LANG[locale as Locale]

  // TODO: 待客户提供真实销售邮箱后从环境变量读取
  const inquiryEmail = process.env.INQUIRY_NOTIFY_EMAIL ?? 'sales@example.com'

  return (
    <html lang={htmlLang}>
      <body lang={htmlLang}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-toast focus:rounded focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-neutral-0"
          >
            Skip to main content
          </a>
          <LocaleSuggestionBanner />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingContact email={inquiryEmail} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
