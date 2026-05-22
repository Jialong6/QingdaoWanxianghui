import type { Locale } from '@/lib/i18n/config'

/** 文章分类：お知らせ（公告）/ コラム（专栏长文）/ 工場日記 */
export const ARTICLE_CATEGORIES = ['announcement', 'column', 'diary'] as const
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]

/** 本地化字符串 */
type L10n = Record<Locale, string>
type L10nList = Record<Locale, string[]>

/** 正文块（纯文本，不渲染原始 HTML → 防 XSS） */
export type Block =
  | { type: 'p'; text: L10n }
  | { type: 'h2'; text: L10n }
  | { type: 'ul'; items: L10nList }

export interface Article {
  slug: string
  category: ArticleCategory
  /** ISO 日期（YYYY-MM-DD） */
  publishedAt: string
  cover: string
  tags: string[]
  title: L10n
  excerpt: L10n
  body: Block[]
}

const COVER = (text: string) =>
  `https://placehold.co/1200x630/1A3B5B/FAFAF7?text=${encodeURIComponent(text)}`

// XXX-TODO: 样稿，待客户/文案提供正式 1,500-5,000 字长文与实拍封面
// ja 为草稿（TODO: native 校对）/ zh 准确 / en 简化
export const ARTICLES: Article[] = [
  {
    slug: 'two-stage-inspection',
    category: 'column',
    publishedAt: '2026-04-10',
    cover: COVER('Two-stage Inspection'),
    tags: ['品質', '検品', 'OEM'],
    title: {
      ja: '日本品質を支える「二段検品」の仕組み',
      en: 'How two-stage inspection upholds Japan-grade quality',
      zh: '支撑日本品质的「二段检品」机制'
    },
    excerpt: {
      ja: '工程内検査と出荷前検査、そして全数 X 線検針。量産品質を安定させる検品体制を解説します。',
      en: 'In-process and pre-shipment checks plus 100% X-ray detection: the inspection setup that keeps mass-production quality stable.',
      zh: '制程内检查、出货前检查，加上全数 X 线检针。解析稳定量产品质的检品体制。'
    },
    body: [
      {
        type: 'p',
        text: {
          ja: 'バッグ OEM で日本基準の品質を実現するには、検品を「点」ではなく「流れ」で設計することが重要です。',
          en: 'Achieving Japan-grade quality in bag OEM means designing inspection as a flow, not a single checkpoint.',
          zh: '要在箱包 OEM 中实现日本标准的品质，关键是把检品设计成「流程」而非「单点」。'
        }
      },
      {
        type: 'h2',
        text: { ja: '二段検品の流れ', en: 'The two-stage flow', zh: '二段检品的流程' }
      },
      {
        type: 'ul',
        items: {
          ja: ['工程内検査（IPQC）：縫製ラインで随時抜き取り', '出荷前検査（OQC）：梱包前に外観・寸法・付属を確認', '全数 X 線検針：折れ針・金属混入をチェック'],
          en: ['In-process (IPQC): sampling on the sewing line', 'Pre-shipment (OQC): appearance, dimensions, accessories before packing', '100% X-ray: broken needles and metal contamination'],
          zh: ['制程内检查（IPQC）：在缝制线随时抽检', '出货前检查（OQC）：装箱前确认外观、尺寸、辅料', '全数 X 线检针：检查断针与金属混入']
        }
      },
      {
        type: 'p',
        text: {
          ja: '中国・緬甸の両工場に X 線検針機を配備し、第三者監査にも対応します。詳しくは品質ページをご覧ください。',
          en: 'Both factories in China and Myanmar have X-ray detectors and support third-party audits. See the Quality page for details.',
          zh: '中国与缅甸双工厂均配备 X 线检针机，并支持第三方验厂。详见品质页面。'
        }
      }
    ]
  },
  {
    slug: 'myanmar-lead-time',
    category: 'column',
    publishedAt: '2026-04-24',
    cover: COVER('Myanmar Lead Time'),
    tags: ['納期', '緬甸', '物流'],
    title: {
      ja: '緬甸生産のリードタイムを正しく理解する',
      en: 'Understanding Myanmar production lead time',
      zh: '正确理解缅甸生产的交期'
    },
    excerpt: {
      ja: 'PP サンプル確認後 約 3 ヶ月。資材・物流・量産の内訳を分解して、計画を立てやすくします。',
      en: 'About 3 months after PP sample approval. We break down materials, logistics and production so you can plan.',
      zh: 'PP 样确认后约 3 个月。拆解物料、物流、量产的构成，便于排产。'
    },
    body: [
      {
        type: 'p',
        text: {
          ja: '「緬甸は遠いから遅い」というイメージは、工程を分解すると整理できます。',
          en: 'The impression that "Myanmar is far, so it is slow" clears up once you break down the stages.',
          zh: '「缅甸远所以慢」的印象，拆解工序后就能厘清。'
        }
      },
      {
        type: 'ul',
        items: {
          ja: ['資材調達・国内手配：約 2 週間', '東莞倉での検品：約 1 週間', '国際輸送・通関：約 2 週間', '量産：約 3 ヶ月'],
          en: ['Material sourcing & domestic handling: ~2 weeks', 'Dongguan warehouse inspection: ~1 week', 'Shipping & customs: ~2 weeks', 'Mass production: ~3 months'],
          zh: ['物料采购与国内安排：约 2 周', '东莞仓检品：约 1 周', '国际运输与清关：约 2 周', '量产：约 3 个月']
        }
      },
      {
        type: 'p',
        text: {
          ja: '急ぎの場合は国内（山東）拠点で最短 30 日から出荷を開始できます。納期ページもあわせてご覧ください。',
          en: 'For rush orders, the domestic Shandong site can start shipping in as little as 30 days. See the Lead Time page too.',
          zh: '加急时国内（山东）拠点最快 30 天开始出货。也请参阅交期页面。'
        }
      }
    ]
  },
  {
    slug: 'small-lot-oem',
    category: 'column',
    publishedAt: '2026-05-08',
    cover: COVER('Small-lot OEM'),
    tags: ['小ロット', 'OEM', '試作'],
    title: {
      ja: 'バッグ OEM の小ロットはどこまで可能か',
      en: 'How small can a bag OEM order be?',
      zh: '箱包 OEM 的小批量能做到多小'
    },
    excerpt: {
      ja: '国内拠点は数百個から、緬甸は単款単色 1,500 個から。試単から始めるご相談に対応します。',
      en: 'Domestic from a few hundred; Myanmar from 1,500 per style/color. We welcome starting from a trial order.',
      zh: '国内拠点数百件起，缅甸单款单色 1,500 件起。欢迎从试单开始。'
    },
    body: [
      {
        type: 'p',
        text: {
          ja: '小ロットの可否は「どの拠点で作るか」で大きく変わります。',
          en: 'Whether small lots are feasible depends heavily on which site produces them.',
          zh: '小批量是否可行，很大程度取决于「在哪个拠点生产」。'
        }
      },
      {
        type: 'p',
        text: {
          ja: '国内（山東）拠点は試作・小ロット・多品種・急単に強く、緬甸は単款単色 1,500 個以上の中大ロットを得意とします。',
          en: 'The domestic Shandong site is strong in trials, small lots, multi-style and rush; Myanmar excels at medium-to-large lots from 1,500 per style/color.',
          zh: '国内（山东）拠点擅长试作、小批量、多款、急单；缅甸擅长单款单色 1,500 件以上的中大货。'
        }
      }
    ]
  }
]

/** 全部分类含 'all' */
export type ArticleFilter = ArticleCategory | 'all'

export function filterArticlesByCategory(articles: Article[], filter: ArticleFilter): Article[] {
  if (filter === 'all') return articles
  return articles.filter((a) => a.category === filter)
}

/** 按发布日期降序 */
export function sortByDateDesc(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

/** 关联文章：同分类、排除自身、最多 limit 篇 */
export function getRelatedArticles(current: Article, limit = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== current.slug && a.category === current.category).slice(0, limit)
}
