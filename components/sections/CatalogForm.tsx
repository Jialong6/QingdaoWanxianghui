'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/lib/i18n/routing'
import { trackEvent } from '@/lib/analytics/events'
import {
  CatalogSchema,
  CATALOG_DEFAULTS,
  INDUSTRIES,
  type CatalogInput
} from '@/lib/validations/catalog'
import { FormField, Input, Select, Checkbox } from '@/components/ui/form'
import { Button } from '@/components/ui'

/** カタログ DL 表单（plan.md §5.13.3）。复用 inquiry 的通用 errors/submit 文案 */
export function CatalogForm() {
  const t = useTranslations('catalog')
  const tc = useTranslations('inquiry')
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CatalogInput>({
    resolver: zodResolver(CatalogSchema),
    defaultValues: CATALOG_DEFAULTS as CatalogInput
  })

  const err = (code?: string) => (code ? tc(`errors.${code}`) : undefined)

  const onSubmit = async (data: CatalogInput) => {
    setSubmitError(null)
    try {
      const res = await fetch('/api/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        setSubmitError(tc('errors.submitFailed'))
        return
      }
      trackEvent('form_submit', { form: 'catalog' })
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

      <FormField htmlFor="industry" label={t('fields.industry')}>
        <Select
          id="industry"
          options={INDUSTRIES.map((i) => ({ value: i, label: t(`industry.${i}`) }))}
          {...register('industry')}
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
