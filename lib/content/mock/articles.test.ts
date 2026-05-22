import { describe, it, expect } from 'vitest'
import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  filterArticlesByCategory,
  sortByDateDesc,
  getArticleBySlug,
  getRelatedArticles
} from './articles'
import { LOCALES } from '@/lib/i18n/config'

describe('articles mock', () => {
  it('至少 2 篇、slug 唯一', () => {
    expect(ARTICLES.length).toBeGreaterThanOrEqual(2)
    expect(new Set(ARTICLES.map((a) => a.slug)).size).toBe(ARTICLES.length)
  })

  it('每篇 title/excerpt 三语齐全、分类合法', () => {
    for (const a of ARTICLES) {
      for (const l of LOCALES) {
        expect(a.title[l]).toBeTruthy()
        expect(a.excerpt[l]).toBeTruthy()
      }
      expect(ARTICLE_CATEGORIES).toContain(a.category)
      expect(a.body.length).toBeGreaterThan(0)
    }
  })

  it('filterArticlesByCategory: all 返回全部 / column 只含 column', () => {
    expect(filterArticlesByCategory(ARTICLES, 'all')).toHaveLength(ARTICLES.length)
    const cols = filterArticlesByCategory(ARTICLES, 'column')
    expect(cols.every((a) => a.category === 'column')).toBe(true)
  })

  it('sortByDateDesc: 降序且不改原数组', () => {
    const sorted = sortByDateDesc(ARTICLES)
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].publishedAt >= sorted[i].publishedAt).toBe(true)
    }
    expect(ARTICLES).toHaveLength(sorted.length)
  })

  it('getArticleBySlug 命中 / 未命中', () => {
    expect(getArticleBySlug(ARTICLES[0].slug)?.slug).toBe(ARTICLES[0].slug)
    expect(getArticleBySlug('nope')).toBeUndefined()
  })

  it('getRelatedArticles: 同类、排除自身、≤3', () => {
    const cur = ARTICLES[0]
    const related = getRelatedArticles(cur)
    expect(related.length).toBeLessThanOrEqual(3)
    expect(related.every((r) => r.slug !== cur.slug)).toBe(true)
    expect(related.every((r) => r.category === cur.category)).toBe(true)
  })
})
