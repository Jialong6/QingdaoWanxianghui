import { LOCALES, type Locale } from './i18n/config'

/** OG 图标题最大长度（防溢出 1200×630 画布） */
export const OG_TITLE_MAX = 40

/** 各 locale 的品牌字标（OG 图与 metadata 一致） */
export const OG_BRAND: Record<Locale, string> = {
  ja: '青島万翔輝',
  en: 'Qingdao Wanxianghui',
  zh: '青岛万翔辉'
}

/** 各 locale 的副标语（OG 图底部 + 缺省标题兜底） */
export const OG_TAGLINE: Record<Locale, string> = {
  ja: '中国と緬甸から、日本品質のバッグを。',
  en: 'Japan-quality bags, made in China and Myanmar.',
  zh: '中国与缅甸双引擎，做日本品质的箱包。'
}

export interface OgParams {
  title: string
  locale: Locale
}

function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as readonly string[]).includes(value)
}

/** 标题截断：超长截到 OG_TITLE_MAX 并加省略号 */
export function clampTitle(title: string): string {
  const trimmed = title.trim()
  if (trimmed.length <= OG_TITLE_MAX) return trimmed
  return `${trimmed.slice(0, OG_TITLE_MAX - 1)}…`
}

/**
 * 解析 /api/og 查询参数（纯函数，便于单测；ImageResponse 渲染留 build/browser 验证）
 * - locale 非法 → 回退 ja
 * - title 缺省 → 用该 locale 副标语；超长截断
 */
export function parseOgParams(searchParams: URLSearchParams): OgParams {
  const localeParam = searchParams.get('locale')
  const locale: Locale = isLocale(localeParam) ? localeParam : 'ja'

  const rawTitle = searchParams.get('title')
  const title = clampTitle(rawTitle && rawTitle.trim() ? rawTitle : OG_BRAND[locale])

  return { title, locale }
}
