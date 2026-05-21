import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { buildBaseMetadata } from '@/lib/metadata'
import { Link } from '@/lib/i18n/routing'
import { Section, Container, Breadcrumb, Heading, Accordion, AccordionItem, Card, Button, JsonLd } from '@/components/ui'
import { faqPageSchema } from '@/lib/schema'
import { FAQ_CATEGORIES, faqFlatItems } from '@/lib/content/mock/faq'

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
  const tMeta = await getTranslations({ locale, namespace: 'pages.faq' })
  return buildBaseMetadata(locale, { path: '/faq', title: tMeta('title') })
}

export default async function FaqPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  const t = await getTranslations('pages.faq')

  // FAQPage 结构化数据（全部问答）
  const schema = faqPageSchema(
    faqFlatItems().map(({ category, item }) => ({
      question: t(`q.${category}.${item}`),
      answer: t(`a.${category}.${item}`)
    }))
  )

  return (
    <Section eyebrow="FAQ" title={t('title')} subtitle={t('intro')} background="subtle" containerSize="lg">
      <JsonLd id="faq-page-jsonld" data={schema} />
      <Container size="lg" className="px-0">
        <Breadcrumb className="mb-8" items={[{ label: t('title'), href: '/' }, { label: t('breadcrumb') }]} />

        <div className="space-y-12">
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <Heading level={2} size="sub" className="mb-4">{t(`cat.${cat.id}`)}</Heading>
              <Accordion>
                {cat.items.map((item) => (
                  <AccordionItem key={item} question={t(`q.${cat.id}.${item}`)}>
                    {t(`a.${cat.id}.${item}`)}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <Card padding="lg" className="mt-16 bg-neutral-0 text-center">
          <h3 className="text-xl font-bold text-neutral-900">{t('ctaTitle')}</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">{t('ctaText')}</p>
          <div className="mt-6">
            <Link href="/contact/inquiry" className="inline-block">
              <Button variant="primary" size="md" type="button">{t('ctaButton')}</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </Section>
  )
}
