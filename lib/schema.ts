import type { Locale } from '@/lib/i18n/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const NAME: Record<Locale, string> = {
  ja: '青島万翔輝',
  en: 'Qingdao Wanxianghui',
  zh: '青岛万翔辉'
}

/** Organization（plan.md §8.2） */
export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: NAME[locale],
    url: SITE_URL,
    foundingDate: '2003',
    // XXX-待客户确认 logo / 社交账号
    description:
      locale === 'ja'
        ? '中国山東 + 緬甸仰光の双拠点を持つバッグ OEM/ODM 工場。'
        : locale === 'zh'
          ? '在中国山东 + 缅甸仰光设有双工厂的箱包 OEM/ODM 制造商。'
          : 'A bag OEM/ODM factory with twin facilities in Shandong (China) and Yangon (Myanmar).'
  }
}

/** LocalBusiness（plan.md §8.2） */
export function localBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: NAME[locale],
    url: SITE_URL,
    // XXX-待客户确认具体地址 / 电话
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      addressRegion: 'Shandong'
    }
  }
}

/** WebSite（plan.md §8.2） */
export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: NAME[locale],
    url: SITE_URL,
    inLanguage: locale
  }
}

/** FAQPage（用于 oem-flow FAQ） */
export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer }
    }))
  }
}
