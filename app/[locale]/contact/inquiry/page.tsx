import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { Section, Container, Breadcrumb } from '@/components/ui'
import { ContactForm } from '@/components/sections/ContactForm'

type Params = { locale: string }

export default async function InquiryPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('inquiry')

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
          items={[
            { label: t('breadcrumbHome'), href: '/' },
            { label: t('breadcrumbContact') }
          ]}
        />
        <ContactForm />
      </Container>
    </Section>
  )
}
