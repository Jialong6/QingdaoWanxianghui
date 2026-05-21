'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/lib/i18n/routing'
import { trackEvent } from '@/lib/analytics/events'
import { SampleSchema, SAMPLE_DEFAULTS, type SampleInput } from '@/lib/validations/sample'
import { PRODUCT_CATEGORIES } from '@/lib/validations/inquiry'
import { FormField, Input, Checkbox, CheckboxGroup, FileUpload } from '@/components/ui/form'
import { Button } from '@/components/ui'
import type { UploadErrorCode, AttachmentMeta } from '@/lib/validations/upload'

/** サンプル依頼 表单（plan.md §5.13.5，含设计稿上传 + 两段提交） */
export function SampleForm() {
  const t = useTranslations('sample')
  const tc = useTranslations('inquiry')
  const cat = useTranslations('inquiry.category')
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<SampleInput>({
    resolver: zodResolver(SampleSchema),
    defaultValues: SAMPLE_DEFAULTS as SampleInput
  })

  const err = (code?: string) => (code ? tc(`errors.${code}`) : undefined)

  const onSubmit = async (data: SampleInput) => {
    setSubmitError(null)
    try {
      let attachments: AttachmentMeta[] | undefined
      if (files.length > 0) {
        const form = new FormData()
        for (const f of files) form.append('files', f)
        const upRes = await fetch('/api/upload', { method: 'POST', body: form })
        const upJson = await upRes.json()
        if (!upRes.ok || !upJson.success) {
          setSubmitError(tc('errors.submitFailed'))
          return
        }
        attachments = upJson.data as AttachmentMeta[]
      }

      const res = await fetch('/api/sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, attachments })
      })
      if (!res.ok) {
        setSubmitError(tc('errors.submitFailed'))
        return
      }
      trackEvent('form_submit', { form: 'sample' })
      router.push('/contact/thanks')
    } catch {
      setSubmitError(tc('errors.submitFailed'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <FormField htmlFor="companyName" label={t('fields.companyName')} required error={err(errors.companyName?.message)}>
        <Input id="companyName" error={!!errors.companyName} {...register('companyName')} />
      </FormField>

      <FormField htmlFor="contactName" label={t('fields.contactName')} required error={err(errors.contactName?.message)}>
        <Input id="contactName" error={!!errors.contactName} {...register('contactName')} />
      </FormField>

      <FormField htmlFor="email" label={t('fields.email')} required error={err(errors.email?.message)}>
        <Input id="email" type="email" error={!!errors.email} {...register('email')} />
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
              options={PRODUCT_CATEGORIES.map((c) => ({ value: c, label: cat(c) }))}
            />
          )}
        />
      </FormField>

      <FormField htmlFor="quantity" label={t('fields.quantity')} error={err(errors.quantity?.message)}>
        <Input id="quantity" placeholder={t('fields.quantityPlaceholder')} {...register('quantity')} />
      </FormField>

      <FormField htmlFor="shippingAddress" label={t('fields.shippingAddress')} required error={err(errors.shippingAddress?.message)}>
        <Input id="shippingAddress" error={!!errors.shippingAddress} placeholder={t('fields.shippingAddressPlaceholder')} {...register('shippingAddress')} />
      </FormField>

      <FormField htmlFor="attachments" label={t('fields.attachments')} help={t('fields.attachmentsHelp')}>
        <FileUpload
          id="attachments"
          value={files}
          onChange={setFiles}
          renderError={(code: UploadErrorCode) => tc(`errors.${code}`)}
        />
      </FormField>

      <FormField htmlFor="privacyAgreed" label="" error={err(errors.privacyAgreed?.message)}>
        <Checkbox id="privacyAgreed" label={tc('fields.privacyAgree')} {...register('privacyAgreed')} />
      </FormField>

      {submitError ? (
        <p className="text-sm text-error" role="alert">
          {submitError}
        </p>
      ) : null}

      <div>
        <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>
          {isSubmitting ? tc('submitting') : tc('submit')}
        </Button>
      </div>
    </form>
  )
}
