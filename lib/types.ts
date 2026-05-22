/**
 * 业务领域类型（mock 数据 + 未来 CMS 内容模型的统一类型源）
 * 参考 plan.md §11.1 Content Types
 */

export interface Stat {
  /** 数值显示（含单位，如 "20+ 年" "約 470 名"） */
  value: string
  /** i18n key 用于副标题（"創業以来" 等） */
  labelKey: string
}

export interface Strength {
  id: string
  /** 标题 i18n key */
  titleKey: string
  /** 描述 i18n key */
  descKey: string
  /** 图标名（用 lucide 时填名字；当前用占位 emoji 字符） */
  icon: string
}

export interface PainPoint {
  id: string
  /** 烦恼 i18n key */
  problemKey: string
  /** 解决 i18n key */
  solutionKey: string
}

/** 工厂归属 tag（案例展示用） */
export type FactoryTag = 'qingdao' | 'shandong' | 'myanmar'

/** 用途场景 tag（案例多维筛选用，与 category/factory 正交） */
export type SceneTag = 'commute' | 'business' | 'school' | 'outdoor' | 'travel'

/** 主素材 tag（案例多维筛选用） */
export type MaterialTag = 'nylon' | 'polyester' | 'canvas' | 'recycled' | 'leather'

export interface CaseItem {
  id: string
  /** 案例缩略图（placeholder URL） */
  image: string
  /** 案例标题（脱敏：「日本上場 EC ブランド様」类） i18n key */
  titleKey: string
  /** 品类 i18n key（backpack/tote/business/student/other） */
  category: 'backpack' | 'tote' | 'business' | 'student' | 'other'
  /** 用途场景 tag（通勤/出張・ビジネス/通学/アウトドア/旅行） */
  scene: SceneTag
  /** 主素材 tag */
  material: MaterialTag
  /** 数量 */
  quantity: string
  /** 工厂 tag */
  factory: FactoryTag
  /** 制作周期 */
  duration: string
  /** 详情页 ギャラリー 图（placeholder URL 数组，XXX-待实拍） */
  gallery?: string[]
}

/** 沿革年表条目（plan.md §5.10.2） */
export interface HistoryEntry {
  year: string
  /** 里程碑事件 i18n key */
  labelKey: string
}

/** contact 四联入口卡（plan.md §5.13.1） */
export interface ContactEntry {
  id: 'inquiry' | 'catalog' | 'visit' | 'sample'
  href: string
  icon: string
}

export interface OemStep {
  step: number
  /** 步骤名 i18n key */
  nameKey: string
  /** 期间 i18n key（"当日〜1営業日" 等） */
  durationKey: string
}

export interface FactoryInfo {
  id: FactoryTag
  /** 工厂名 i18n key */
  nameKey: string
  /** 工厂副标题 i18n key */
  subtitleKey: string
  image: string
  /** 关键数字 4 项：面积 / 人员 / 平车 / 电脑车 */
  metrics: Array<{ value: string; labelKey: string }>
}

export interface MediaCoverage {
  id: string
  /** 媒体名（占位文字，待客户授权后填实际 logo URL） */
  name: string
  /** 报道日期占位 */
  date?: string
}

export interface Certification {
  id: string
  /** 认证名 i18n key */
  nameKey: string
  /** 认证图标 placeholder URL */
  image: string
}

export interface CustomerSegment {
  id: string
  /** 业种简称 i18n key（"日本上場 EC 様" 等） */
  labelKey: string
}

/** 三联 CTA 单元 */
export interface CtaCard {
  id: 'inquiry' | 'catalog' | 'visit'
  /** 标题 i18n key */
  titleKey: string
  /** 描述 i18n key */
  descKey: string
  /** 按钮文字 i18n key */
  ctaKey: string
  /** 链接 */
  href: string
}
