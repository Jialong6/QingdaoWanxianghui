'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/lib/i18n/routing'
import {
  InquirySchema,
  INQUIRY_DEFAULTS,
  PRODUCT_CATEGORIES,
  QUOTE_TERMS,
  INQUIRY_LANGUAGES,
  type InquiryInput
} from '@/lib/validations/inquiry'
import {
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
  FileUpload
} from '@/components/ui/form'
import { Button } from '@/components/ui'
import type { UploadErrorCode, AttachmentMeta } from '@/lib/validations/upload'

/**
 * 询盘表单（plan.md §5.13.2 + §9.2）
 * - RHF + zodResolver 客户端校验（服务端 API 二次校验）
 * - 提交 POST /api/inquiry，成功跳转 thanks 页
 * - 错误信息走 i18n（Zod 返回 message code）
 */
export function ContactForm() {
  const t = useTranslations('inquiry')
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<InquiryInput>({
    resolver: zodResolver(InquirySchema),
    defaultValues: INQUIRY_DEFAULTS as InquiryInput
  })

  const err = (code?: string) => (code ? t(`errors.${code}`) : undefined)

  const onSubmit = async (data: InquiryInput) => {
    setSubmitError(null)
    try {
      // 第 1 段：有文件先上传，拿到元信息（无存储时降级返回 name/size/type）
      let attachments: AttachmentMeta[] | undefined
      if (files.length > 0) {
        const form = new FormData()
        for (const f of files) form.append('files', f)
        const upRes = await fetch('/api/upload', { method: 'POST', body: form })
        const upJson = await upRes.json()
        if (!upRes.ok || !upJson.success) {
          setSubmitError(t('errors.submitFailed'))
          return
        }
        attachments = upJson.data as AttachmentMeta[]
      }

      // 第 2 段：询盘 JSON 提交（带附件元信息）
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, attachments })
      })
      if (!res.ok) {
        setSubmitError(t('errors.submitFailed'))
        return
      }
      router.push('/contact/inquiry/thanks')
    } catch {
      setSubmitError(t('errors.submitFailed'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <FormField htmlFor="companyName" label={t('fields.companyName')} required error={err(errors.companyName?.message)}>
        <Input
          id="companyName"
          error={!!errors.companyName}
          placeholder={t('fields.companyNamePlaceholder')}
          {...register('companyName')}
        />
      </FormField>

      <FormField htmlFor="contactName" label={t('fields.contactName')} required error={err(errors.contactName?.message)}>
        <Input
          id="contactName"
          error={!!errors.contactName}
          placeholder={t('fields.contactNamePlaceholder')}
          {...register('contactName')}
        />
      </FormField>

      <FormField htmlFor="email" label={t('fields.email')} required error={err(errors.email?.message)}>
        <Input
          id="email"
          type="email"
          error={!!errors.email}
          placeholder={t('fields.emailPlaceholder')}
          {...register('email')}
        />
      </FormField>

      <FormField htmlFor="phone" label={t('fields.phone')} error={err(errors.phone?.message)}>
        <Input id="phone" placeholder={t('fields.phonePlaceholder')} {...register('phone')} />
      </FormField>

      <FormField htmlFor="language" label={t('fields.language')}>
        <Select
          id="language"
          options={INQUIRY_LANGUAGES.map((l) => ({ value: l, label: t(`language.${l}`) }))}
          {...register('language')}
        />
      </FormField>

      <FormField htmlFor="productCategory" label={t('fields.productCategory')} required error={err(errors.productCategory?.message as string | undefined)}>
        <Controller
          control={control}
          name="productCategory"
          render={({ field }) => (
            <CheckboxGroup
              name="productCategory"
              value={field.value ?? []}
              onChange={field.onChange}
              error={!!errors.productCategory}
              options={PRODUCT_CATEGORIES.map((c) => ({ value: c, label: t(`category.${c}`) }))}
            />
          )}
        />
      </FormField>

      <FormField htmlFor="quantity" label={t('fields.quantity')} error={err(errors.quantity?.message)}>
        <Input id="quantity" placeholder={t('fields.quantityPlaceholder')} {...register('quantity')} />
      </FormField>

      <FormField htmlFor="desiredLeadTime" label={t('fields.desiredLeadTime')} error={err(errors.desiredLeadTime?.message)}>
        <Input
          id="desiredLeadTime"
          placeholder={t('fields.desiredLeadTimePlaceholder')}
          {...register('desiredLeadTime')}
        />
      </FormField>

      <FormField htmlFor="quoteTerms" label={t('fields.quoteTerms')}>
        <Select
          id="quoteTerms"
          options={QUOTE_TERMS.map((q) => ({ value: q, label: t(`quoteTerms.${q}`) }))}
          {...register('quoteTerms')}
        />
      </FormField>

      <FormField htmlFor="message" label={t('fields.message')} error={err(errors.message?.message)}>
        <Textarea
          id="message"
          error={!!errors.message}
          placeholder={t('fields.messagePlaceholder')}
          {...register('message')}
        />
      </FormField>

      <FormField
        htmlFor="attachments"
        label={t('fields.attachments')}
        help={t('fields.attachmentsHelp')}
      >
        <FileUpload
          id="attachments"
          value={files}
          onChange={setFiles}
          renderError={(code: UploadErrorCode) => t(`errors.${code}`)}
        />
      </FormField>

      <FormField htmlFor="privacyAgreed" label="" error={err(errors.privacyAgreed?.message)}>
        <Checkbox id="privacyAgreed" label={t('fields.privacyAgree')} {...register('privacyAgreed')} />
      </FormField>

      {submitError ? (
        <p className="text-sm text-error" role="alert">
          {submitError}
        </p>
      ) : null}

      <div>
        <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </div>
    </form>
  )
}
