import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { type NextRequest } from 'next/server'
import { parseOgParams, OG_BRAND, OG_TAGLINE } from '@/lib/og'

// next/og 需 fs 读本地字体 → Node runtime（无 edge 1MB 限制）
export const runtime = 'nodejs'

const FONT_DIR = join(process.cwd(), 'assets', 'fonts')

// 设计 token（design.md §1.1）：米白底 + 藏蓝主色 + 暖橙强调
const COLOR_BG = '#F5EFE3' // craft.paper
const COLOR_PRIMARY = 'hsl(212, 60%, 22%)' // primary-700
const COLOR_INK = '#1F1B16' // craft.ink
const COLOR_ACCENT = '#F4A04E' // accent-500
const COLOR_MUTED = '#6B6B66' // neutral-500

const EYEBROW = 'QINGDAO WANXIANGHUI · BAG OEM FACTORY'

/**
 * GET /api/og?title=...&locale=... — 动态 OG 图（1200×630）
 * 全站每页经 lib/metadata.ts 自动引用本端点
 * TODO: 最终 OG 视觉设计待客户确认（XXX，roadmap 已列）
 */
export async function GET(request: NextRequest) {
  const { title, locale } = parseOgParams(request.nextUrl.searchParams)

  const [regular, bold] = await Promise.all([
    readFile(join(FONT_DIR, 'NotoSansJP-Regular.ttf')),
    readFile(join(FONT_DIR, 'NotoSansJP-Bold.ttf'))
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '72px 80px',
          backgroundColor: COLOR_BG,
          borderTop: `12px solid ${COLOR_PRIMARY}`
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            fontWeight: 700,
            color: COLOR_ACCENT
          }}
        >
          {EYEBROW}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 76,
            lineHeight: 1.25,
            fontWeight: 700,
            color: COLOR_PRIMARY,
            maxWidth: 1000
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', fontSize: 22, color: COLOR_MUTED }}>
            {OG_TAGLINE[locale]}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 12,
              fontSize: 34,
              fontWeight: 700,
              color: COLOR_INK
            }}
          >
            {OG_BRAND[locale]}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Noto Sans JP', data: regular, weight: 400, style: 'normal' },
        { name: 'Noto Sans JP', data: bold, weight: 700, style: 'normal' }
      ]
    }
  )
}
