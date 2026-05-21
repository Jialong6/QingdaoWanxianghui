import createMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n/routing'

export default createMiddleware(routing)

export const config = {
  /**
   * 拦截所有路径，但跳过：
   * - /api/*, /_next/*, /_vercel/*
   * - 静态文件（含扩展名）
   */
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
