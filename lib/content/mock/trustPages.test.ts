import { describe, it, expect } from 'vitest'
import { INSPECTION_STEPS, QC_METHODS, XRAY_UNITS, CERTIFICATIONS } from './quality'
import { LEAD_PHASES, DOMESTIC_RUSH_DAYS, PRODUCTION_MONTHS, LEAD_VARIABLES } from './leadTime'
import { TRADE_TERMS, PAYMENT_TERMS, MOQ, TT_DEPOSIT_PERCENT, TT_BALANCE_PERCENT } from './commercial'
import { SAMPLING_STEPS, FIRST_SAMPLE_DAYS, REVISION_ROUNDS, SAMPLING_NOTES } from './sampling'
import { FAQ_CATEGORIES, faqFlatItems } from './faq'

const uniq = (arr: readonly string[]) => new Set(arr).size === arr.length

describe('quality mock', () => {
  it('4 检品步骤、id 唯一', () => {
    expect(INSPECTION_STEPS).toHaveLength(4)
    expect(uniq(INSPECTION_STEPS)).toBe(true)
  })
  it('X 線台数：中国 1 / 緬甸 2', () => {
    expect(XRAY_UNITS).toEqual({ china: 1, myanmar: 2 })
  })
  it('品控手段与认证非空', () => {
    expect(QC_METHODS.length).toBeGreaterThan(0)
    expect(CERTIFICATIONS.length).toBeGreaterThan(0)
  })
})

describe('leadTime mock', () => {
  it('4 个工程阶段、id 唯一', () => {
    expect(LEAD_PHASES).toHaveLength(4)
    expect(uniq(LEAD_PHASES)).toBe(true)
  })
  it('国内急单 30 日 / 量产 3 月', () => {
    expect(DOMESTIC_RUSH_DAYS).toBe(30)
    expect(PRODUCTION_MONTHS).toBe(3)
  })
  it('变量 2 项', () => {
    expect(LEAD_VARIABLES).toHaveLength(2)
  })
})

describe('commercial mock', () => {
  it('取引/決済条件非空、id 唯一', () => {
    expect(TRADE_TERMS.length).toBeGreaterThan(0)
    expect(PAYMENT_TERMS.length).toBeGreaterThan(0)
    expect(uniq(TRADE_TERMS)).toBe(true)
    expect(uniq(PAYMENT_TERMS)).toBe(true)
  })
  it('MOQ 緬甸 1500 / T/T 30+70=100', () => {
    expect(MOQ.myanmarMin).toBe(1500)
    expect(TT_DEPOSIT_PERCENT + TT_BALANCE_PERCENT).toBe(100)
  })
})

describe('sampling mock', () => {
  it('4 步骤、首样 7 日、修改 2 次', () => {
    expect(SAMPLING_STEPS).toHaveLength(4)
    expect(FIRST_SAMPLE_DAYS).toBe(7)
    expect(REVISION_ROUNDS).toBe(2)
    expect(SAMPLING_NOTES.length).toBeGreaterThan(0)
  })
})

describe('faq mock', () => {
  it('6 个分类、id 唯一', () => {
    expect(FAQ_CATEGORIES).toHaveLength(6)
    expect(uniq(FAQ_CATEGORIES.map((c) => c.id))).toBe(true)
  })
  it('问答合计 ≥ 15、扁平化条数一致', () => {
    const flat = faqFlatItems()
    expect(flat.length).toBeGreaterThanOrEqual(15)
    const total = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0)
    expect(flat).toHaveLength(total)
  })
  it('每个分类内 item id 唯一', () => {
    for (const c of FAQ_CATEGORIES) {
      expect(uniq(c.items)).toBe(true)
    }
  })
})
