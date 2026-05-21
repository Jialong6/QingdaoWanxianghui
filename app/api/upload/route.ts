import { NextResponse, type NextRequest } from 'next/server'
import { validateFileList, type AttachmentMeta } from '@/lib/validations/upload'

/** 速率限制：同 IP 每窗口最多 N 次 */
const RATE_LIMIT = 10
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

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ success: false, error: 'invalidForm' }, { status: 400 })
  }

  // 用 duck typing 而非 instanceof File（jsdom/undici 跨环境 File 实例不一致）
  const files = form
    .getAll('files')
    .filter((v): v is File => typeof v !== 'string' && v != null)

  const meta = files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
  const error = validateFileList(meta)
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 })
  }

  // 降级：不持久化，仅返回元信息
  // TODO: 接 S3 / R2 / Vercel Blob 持久化 + 病毒扫描
  const data: AttachmentMeta[] = meta
  return NextResponse.json({ success: true, data })
}
