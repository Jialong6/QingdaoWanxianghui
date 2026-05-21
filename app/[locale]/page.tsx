import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import {
  HeroBanner,
  StatsBar,
  StrengthsSection,
  PainPointsSection,
  WorksPreview,
  OemFlowSection,
  FactoryShowcase,
  TrustSection,
  TripleCtaSection
} from '@/components/sections'
import { JsonLd } from '@/components/ui'
import { organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/schema'

type Params = { locale: string }

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale as Locale)

  return (
    <>
      <JsonLd
        id="home-jsonld"
        data={[organizationSchema(locale), localBusinessSchema(locale), websiteSchema(locale)]}
      />
      <HeroBanner />
      <StatsBar />
      <StrengthsSection />
      <PainPointsSection />
      <WorksPreview />
      <OemFlowSection />
      <FactoryShowcase />
      <TrustSection />
      <TripleCtaSection />
    </>
  )
}
