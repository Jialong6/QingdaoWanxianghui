import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Section, Container, Breadcrumb, Heading, Accordion, AccordionItem, JsonLd } from '@/components/ui'
import { OEM_FLOW } from '@/lib/content/mock/oemFlow'
import { faqPageSchema } from '@/lib/schema'

type Params = { locale: string }

const FAQ_KEYS = ['inquiry', 'sampling', 'production'] as const

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
  const tMeta = await getTranslations({ locale, namespace: 'home.oemFlow' })
  return buildBaseMetadata(locale, { path: '/oem-flow', title: tMeta('title') })
}

export default async function OemFlowPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.oemFlow')
  const tf = await getTranslations('home.oemFlow')

  return (
    <Section
      eyebrow="OEM PROCESS"
      title={tf('title')}
      subtitle={t('intro')}
      background="subtle"
      containerSize="lg"
    >
      <JsonLd
        id="oem-flow-faq-jsonld"
        data={faqPageSchema(FAQ_KEYS.map((k) => ({ question: t(`faq.${k}.q`), answer: t(`faq.${k}.a`) })))}
      />
      <Container size="lg" className="px-0">
        <Breadcrumb
          className="mb-10"
          items={[
            { label: tf('title'), href: '/' },
            { label: t('breadcrumb') }
          ]}
        />

        {/* 7 步时间轴 */}
        <ol className="relative mb-16 border-l border-neutral-200 pl-8">
          {OEM_FLOW.map((step) => {
            const key = step.nameKey.split('.')[0]
            return (
              <li key={step.step} className="relative mb-8 last:mb-0">
                <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-en-sans text-sm font-bold text-neutral-0">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-neutral-900">{tf(`items.${key}.name`)}</h3>
                <p className="mt-1 text-sm text-neutral-500">{tf(`items.${key}.duration`)}</p>
              </li>
            )
          })}
        </ol>

        {/* よくあるご質問 */}
        <Heading level={2} size="sub" className="mb-6">
          {t('faqTitle')}
        </Heading>
        <Accordion>
          {FAQ_KEYS.map((k) => (
            <AccordionItem key={k} question={t(`faq.${k}.q`)}>
              {t(`faq.${k}.a`)}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}
