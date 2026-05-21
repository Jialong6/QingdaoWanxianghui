import type { Metadata } from 'next'
import { LOCALES, type Locale } from './i18n/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/** 各 locale 的站点基础名称 / 副标题（与 messages/*.json meta 保持一致） */
const SITE_META: Record<Locale, { name: string; tagline: string; subTagline: string }> = {
  ja: {
    name: '青島万翔輝',
    tagline: 'どこまでも、現場であること。',
    subTagline: '中国と緬甸から、日本品質のバッグを。'
  },
  en: {
    name: 'Qingdao Wanxianghui',
    tagline: 'Always grounded on the factory floor.',
    subTagline: 'Japan-quality bags, made in China and Myanmar.'
  },
  zh: {
    name: '青岛万翔辉',
    tagline: '始终立足现场。',
    subTagline: '中国与缅甸双引擎，做日本品质的箱包。'
  }
}

export interface BuildMetadataOptions {
  /** 页面路径（不含 locale 前缀），如 '/strength'。默认首页 '' */
  path?: string
  /** 页面专属标题（子页传入；由 layout template 自动套 ` | siteName`）。不传则用首页标题 + template */
  title?: string
  /** 页面专属描述。不传用站点 subTagline */
  description?: string
}

/**
 * 生成符合 plan.md §8.2 SEO 要求的 Metadata
 * - Title ≤ 60 chars；Description ≤ 160 chars；hreflang 三语 + x-default
 * - **layout 调用（无 title）**：返回 title.template（只在 layout 设一次）
 * - **子页调用（有 title）**：返回纯字符串 title，由 layout template 套 ` | name`（避免重复叠加）
 */
export function buildBaseMetadata(locale: Locale, options: BuildMetadataOptions = {}): Metadata {
  const { path = '', title: pageTitle, description: pageDesc } = options
  const meta = SITE_META[locale]
  const description = (pageDesc ?? meta.subTagline).slice(0, 160)

  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    const prefix = l === 'ja' ? '' : `/${l}`
    languages[l] = `${SITE_URL}${prefix}${path}`
  }
  languages['x-default'] = `${SITE_URL}${path}`

  const canonical = `${SITE_URL}${locale === 'ja' ? '' : `/${locale}`}${path}`
  const ogLocale = locale === 'ja' ? 'ja_JP' : locale === 'zh' ? 'zh_CN' : 'en_US'

  // 子页：纯字符串 title（layout template 套）；layout：default + template
  const title: Metadata['title'] = pageTitle
    ? pageTitle
    : { default: `${meta.tagline} | ${meta.name}`.slice(0, 60), template: `%s | ${meta.name}` }

  // OG 标题：子页用「页面名 | name」，首页用 tagline | name
  const ogTitle = pageTitle ? `${pageTitle} | ${meta.name}` : `${meta.tagline} | ${meta.name}`

  // 动态 OG 图（/api/og）：图内已含品牌字标，故只传裸标题（子页页名 / 首页 tagline）
  const ogImageTitle = pageTitle ?? meta.tagline
  const ogImageUrl = `/api/og?title=${encodeURIComponent(ogImageTitle)}&locale=${locale}`
  const ogImages = [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }]

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: meta.name,
      locale: ogLocale,
      type: 'website',
      images: ogImages
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description, images: ogImages },
    robots: { index: true, follow: true }
  }
}
