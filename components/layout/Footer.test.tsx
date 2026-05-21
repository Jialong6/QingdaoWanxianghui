import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

vi.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}))

import { Footer } from './Footer'

const messages = {
  meta: { siteName: '青島万翔輝', siteTagline: 'X', siteSubTagline: 'Y' },
  nav: { sitemap: 'サイトマップ', privacy: 'プライバシー', terms: '利用規約' },
  footer: {
    company: 'COMPANY',
    services: 'SERVICES',
    products: 'PRODUCTS',
    resources: 'RESOURCES',
    social: 'SOCIAL',
    companyProfile: '会社概要',
    message: '代表挨拶',
    history: '沿革',
    careers: '採用情報',
    oemFlow: 'OEM の流れ',
    quality: '品質',
    factory: '工場',
    leadTime: '納期',
    commercial: '商務条件',
    sampling: 'サンプリング',
    faq: 'よくある質問',
    backpack: 'リュック',
    tote: 'トート',
    business: 'ビジネス',
    student: '学生用',
    catalog: 'カタログ',
    contact: 'お問い合わせ',
    visit: '工場見学',
    newsletter: 'ニュースレター',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    wechat: 'WeChat',
    addressesTitle: '拠点',
    qingdaoLabel: '青島本社',
    qingdaoAddress: '青島市 XXX',
    shandongLabel: '山東工場',
    shandongAddress: '日照市莒県',
    myanmarLabel: '緬甸工場',
    myanmarAddress: 'Yangon',
    copyright: '© {year} 青島万翔輝 All Rights Reserved.'
  }
}

function wrap(node: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="ja" messages={messages}>
      {node}
    </NextIntlClientProvider>
  )
}

describe('Footer', () => {
  it('渲染为 contentinfo / footer 元素', () => {
    render(wrap(<Footer />))
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('包含 5 个栏目标题', () => {
    render(wrap(<Footer />))
    expect(screen.getByText('COMPANY')).toBeInTheDocument()
    expect(screen.getByText('SERVICES')).toBeInTheDocument()
    expect(screen.getByText('PRODUCTS')).toBeInTheDocument()
    expect(screen.getByText('RESOURCES')).toBeInTheDocument()
    expect(screen.getByText('SOCIAL')).toBeInTheDocument()
  })

  it('包含 3 个工厂地址', () => {
    render(wrap(<Footer />))
    expect(screen.getByText('青島本社')).toBeInTheDocument()
    expect(screen.getByText('山東工場')).toBeInTheDocument()
    expect(screen.getByText('緬甸工場')).toBeInTheDocument()
  })

  it('版权年份动态显示当前年份', () => {
    render(wrap(<Footer />))
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument()
  })

  it('包含隐私 / 条款 / 网站地图链接', () => {
    render(wrap(<Footer />))
    expect(screen.getByText('プライバシー')).toBeInTheDocument()
    expect(screen.getByText('利用規約')).toBeInTheDocument()
    expect(screen.getByText('サイトマップ')).toBeInTheDocument()
  })

  it('应用深色背景类 primary-900', () => {
    render(wrap(<Footer />))
    expect(screen.getByRole('contentinfo').className).toMatch(/bg-primary-900/)
  })
})
