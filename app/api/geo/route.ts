import { NextResponse, type NextRequest } from 'next/server'

/**
 * GET /api/geo — 返回访客所在国家代码（喂 hooks/useGeoCountry）
 * - 读地理头：x-vercel-ip-country（Vercel）→ cf-ipcountry（Cloudflare）→ null
 * - 只读、无副作用，无需速率限制
 * - 无头时（本地 dev / 未部署到边缘）优雅降级为 null，由 useGeoCountry 处理
 *
 * TODO: 部署平台地理头确认（Vercel / Cloudflare），见 plan §XXX 待确认
 */
export async function GET(request: NextRequest) {
  const raw =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    null

  const countryCode = raw ? raw.trim().toUpperCase() : null
  const countryName = countryCode ? countryNameFor(countryCode) : null

  return NextResponse.json({
    success: true,
    data: { countryCode, countryName }
  })
}

/** 尽力把国家代码转英文国名；不支持则回代码本身 */
function countryNameFor(code: string): string {
  try {
    const display = new Intl.DisplayNames(['en'], { type: 'region' })
    return display.of(code) ?? code
  } catch {
    return code
  }
}
