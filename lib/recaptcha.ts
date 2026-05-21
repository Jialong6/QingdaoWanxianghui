interface RecaptchaResult {
  ok: boolean
  /** 无 secret key 配置时为 true（开发降级） */
  skipped: boolean
  score?: number
  error?: string
}

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
/** v3 分数阈值：低于此分判定为可疑 */
const SCORE_THRESHOLD = 0.5

/**
 * 校验 reCAPTCHA v3 token（plan.md §9.2）
 * - 无 RECAPTCHA_SECRET_KEY 时优雅降级：直接通过并标记 skipped
 * - 有则调 Google verify API，按 score 阈值判定
 */
export async function verifyRecaptcha(token: string | undefined | null): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret || secret === 'XXXXXX') {
    return { ok: true, skipped: true }
  }

  if (!token) {
    return { ok: false, skipped: false, error: 'missing-token' }
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token })
    })
    const data = (await res.json()) as { success: boolean; score?: number }
    const score = data.score ?? 0
    return {
      ok: data.success && score >= SCORE_THRESHOLD,
      skipped: false,
      score
    }
  } catch {
    return { ok: false, skipped: false, error: 'verify-failed' }
  }
}
