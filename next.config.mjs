import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
    // 占位期：mock 图来自 placehold.co，跳过服务端优化以免离线/无网时 build 报错。
    // TODO: 接入客户实拍 + CDN 后移除，恢复 Next 图片优化
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  }
}

export default withNextIntl(nextConfig)
