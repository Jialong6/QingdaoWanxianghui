import { describe, it, expect } from 'vitest'
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  faqPageSchema,
  articleSchema
} from './schema'

describe('schema', () => {
  it('organizationSchema 含 @type=Organization', () => {
    const s = organizationSchema('ja')
    expect(s['@type']).toBe('Organization')
    expect(s.name).toBe('青島万翔輝')
    expect(s.foundingDate).toBe('2003')
  })

  it('localBusinessSchema 含 @type=LocalBusiness + address', () => {
    const s = localBusinessSchema('en')
    expect(s['@type']).toBe('LocalBusiness')
    expect(s.address).toBeDefined()
  })

  it('websiteSchema 含 inLanguage', () => {
    expect(websiteSchema('zh').inLanguage).toBe('zh')
  })

  it('faqPageSchema 条数正确 + 结构', () => {
    const s = faqPageSchema([
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' }
    ])
    expect(s['@type']).toBe('FAQPage')
    expect(s.mainEntity).toHaveLength(2)
    expect(s.mainEntity[0]).toMatchObject({
      '@type': 'Question',
      name: 'Q1',
      acceptedAnswer: { '@type': 'Answer', text: 'A1' }
    })
  })

  it('articleSchema 含 @type=BlogPosting + 字段', () => {
    const s = articleSchema({
      slug: 'two-stage-inspection',
      headline: '二段検品',
      description: 'desc',
      datePublished: '2026-04-10',
      locale: 'ja'
    })
    expect(s['@type']).toBe('BlogPosting')
    expect(s.headline).toBe('二段検品')
    expect(s.datePublished).toBe('2026-04-10')
    expect(s.inLanguage).toBe('ja')
    expect(s.url).toContain('/news/two-stage-inspection')
  })

  it('articleSchema en 文章 url 带 /en 前缀', () => {
    const s = articleSchema({
      slug: 'x',
      headline: 'h',
      description: 'd',
      datePublished: '2026-01-01',
      locale: 'en'
    })
    expect(s.url).toContain('/en/news/x')
  })
})
