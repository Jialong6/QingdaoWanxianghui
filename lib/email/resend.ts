import type { InquiryInput } from '@/lib/validations/inquiry'

interface SendResult {
  sent: boolean
  /** 无 RESEND_API_KEY 时为 true（开发降级，仅打印） */
  skipped: boolean
  error?: string
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
// XXX-TODO: 待客户提供发件域名后替换
const FROM_ADDRESS = 'noreply@wanxianghui.example.com'

/**
 * 发送询盘相关邮件（plan.md §5.13.2）
 * - 客户自动回复 + 内部销售通知（双邮件）
 * - 无 RESEND_API_KEY 时优雅降级：console.warn 打印询盘内容，不真发
 */
export async function sendInquiryEmails(data: InquiryInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.INQUIRY_NOTIFY_EMAIL ?? 'sales@example.com'

  if (!apiKey || apiKey.startsWith('re_XXX')) {
    // 开发降级：不真发，打印到服务端日志便于调试
    console.warn('[inquiry] RESEND_API_KEY 未配置，邮件降级为日志输出：', {
      to: notifyEmail,
      company: data.companyName,
      contact: data.contactName,
      email: data.email,
      category: data.productCategory,
      message: data.message,
      attachments: data.attachments?.map((a) => a.name) ?? []
    })
    return { sent: false, skipped: true }
  }

  try {
    // 内部销售通知
    await postEmail(apiKey, {
      from: FROM_ADDRESS,
      to: notifyEmail,
      subject: `【新規お問い合わせ】${data.companyName} 様`,
      text: buildInternalNotification(data)
    })

    // 客户自动回复
    await postEmail(apiKey, {
      from: FROM_ADDRESS,
      to: data.email,
      subject: 'お問い合わせを受け付けました｜青島万翔輝',
      text: buildAutoReply(data)
    })

    return { sent: true, skipped: false }
  } catch {
    return { sent: false, skipped: false, error: 'send-failed' }
  }
}

interface EmailPayload {
  from: string
  to: string
  subject: string
  text: string
}

async function postEmail(apiKey: string, payload: EmailPayload): Promise<void> {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    throw new Error(`resend ${res.status}`)
  }
}

export type FormType = 'catalog' | 'visit' | 'sample'

/**
 * 通用表单提交通知（catalog / visit / sample）
 * - 无 RESEND_API_KEY 时降级为 console 日志
 * - TODO: catalog 需发 PDF 签名 URL（48h）+ EDM 5 封培育流；全部表单写入 CRM
 */
export async function notifyFormSubmission(
  type: FormType,
  data: Record<string, unknown>
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.INQUIRY_NOTIFY_EMAIL ?? 'sales@example.com'

  if (!apiKey || apiKey.startsWith('re_XXX')) {
    console.warn(`[${type}] RESEND_API_KEY 未配置，邮件降级为日志输出：`, { to: notifyEmail, ...data })
    return { sent: false, skipped: true }
  }

  try {
    await postEmail(apiKey, {
      from: FROM_ADDRESS,
      to: notifyEmail,
      subject: `【${type}】新規申込`,
      text: JSON.stringify(data, null, 2)
    })
    return { sent: true, skipped: false }
  } catch {
    return { sent: false, skipped: false, error: 'send-failed' }
  }
}

function buildInternalNotification(d: InquiryInput): string {
  return [
    '新しいお問い合わせが届きました。',
    '',
    `御社名: ${d.companyName}`,
    `ご担当者: ${d.contactName}`,
    `メール: ${d.email}`,
    `電話: ${d.phone || '-'}`,
    `言語: ${d.language}`,
    `製品カテゴリー: ${d.productCategory.join(', ')}`,
    `想定数量: ${d.quantity || '-'}`,
    `希望納期: ${d.desiredLeadTime || '-'}`,
    `見積もり条件: ${d.quoteTerms}`,
    `ご相談内容: ${d.message || '-'}`
  ].join('\n')
}

function buildAutoReply(d: InquiryInput): string {
  return [
    `${d.contactName} 様`,
    '',
    'この度はお問い合わせいただき、誠にありがとうございます。',
    '担当者が内容を確認のうえ、24 時間以内に日本語でご返信いたします。',
    '',
    '青島万翔輝'
  ].join('\n')
}
