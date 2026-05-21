import { NextResponse, type NextRequest } from 'next/server'
import { InquirySchema } from '@/lib/validations/inquiry'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { sendInquiryEmails } from '@/lib/email/resend'

/** 简单内存速率限制：同 IP 每窗口最多 N 次 */
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
    return NextResponse.json(
      { success: false, error: 'rateLimited' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'invalidJson' }, { status: 400 })
  }

  const payload = body as { recaptchaToken?: string } & Record<string, unknown>

  // 服务端 Zod 双校验
  const parsed = InquirySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  // reCAPTCHA（无 key 时降级通过）
  const captcha = await verifyRecaptcha(payload.recaptchaToken)
  if (!captcha.ok) {
    return NextResponse.json({ success: false, error: 'recaptcha' }, { status: 400 })
  }

  // 邮件（无 key 时降级为日志）
  // TODO: CRM 写入（HubSpot/Pipedrive/Notion 待客户确认）
  const mail = await sendInquiryEmails(parsed.data)
  if (mail.error) {
    return NextResponse.json({ success: false, error: 'mailFailed' }, { status: 502 })
  }

  return NextResponse.json({
    success: true,
    data: { received: true, emailSent: mail.sent }
  })
}
