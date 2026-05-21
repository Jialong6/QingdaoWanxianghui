import { NextResponse, type NextRequest } from 'next/server'
import { CatalogSchema } from '@/lib/validations/catalog'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { notifyFormSubmission } from '@/lib/email/resend'

const RATE_LIMIT = 5
const WINDOW_MS = 60_000
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ success: false, error: 'rateLimited' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'invalidJson' }, { status: 400 })
  }

  const payload = body as { recaptchaToken?: string } & Record<string, unknown>
  const parsed = CatalogSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const captcha = await verifyRecaptcha(payload.recaptchaToken)
  if (!captcha.ok) {
    return NextResponse.json({ success: false, error: 'recaptcha' }, { status: 400 })
  }

  // TODO: 发 PDF カタログ 签名 URL（48h）+ 加入 EDM 5 封培育流 + CRM
  const mail = await notifyFormSubmission('catalog', { ...parsed.data })
  if (mail.error) {
    return NextResponse.json({ success: false, error: 'mailFailed' }, { status: 502 })
  }

  return NextResponse.json({ success: true, data: { received: true } })
}
