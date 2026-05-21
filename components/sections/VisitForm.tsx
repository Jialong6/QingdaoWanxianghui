'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/lib/i18n/routing'
import {
  VisitSchema,
  VISIT_DEFAULTS,
  VISIT_SITES,
  TRANSLATION_OPTIONS,
  type VisitInput
} from '@/lib/validations/visit'
import { FormField, Input, Textarea, Select, Checkbox, CheckboxGroup } from '@/components/ui/form'
import { Button } from '@/components/ui'

/** 工場見学申込 表单（plan.md §5.13.4） */
export function VisitForm() {
  const t = useTranslations('visit')
  const tc = useTranslations('inquiry')
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<VisitInput>({
    resolver: zodResolver(VisitSchema),
    defaultValues: VISIT_DEFAULTS as VisitInput
  })

  const err = (code?: string) => (code ? tc(`errors.${code}`) : undefined)

  const onSubmit = async (data: VisitInput) => {
    setSubmitError(null)
    try {
      const res = await fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        setSubmitError(tc('errors.submitFailed'))
        return
      }
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

      <FormField htmlFor="sites" label={t('fields.sites')} required error={err(errors.sites?.message as string | undefined)}>
        <Controller
          control={control}
          name="sites"
          render={({ field }) => (
            <CheckboxGroup
              name="sites"
              value={field.value ?? []}
              onChange={field.onChange}
              error={!!errors.sites}
              options={VISIT_SITES.map((s) => ({ value: s, label: t(`sites.${s}`) }))}
            />
          )}
        />
      </FormField>

      <FormField htmlFor="preferredDate" label={t('fields.preferredDate')} error={err(errors.preferredDate?.message)}>
        <Input id="preferredDate" placeholder={t('fields.preferredDatePlaceholder')} {...register('preferredDate')} />
      </FormField>

      <FormField htmlFor="companions" label={t('fields.companions')} error={err(errors.companions?.message)}>
        <Input id="companions" placeholder={t('fields.companionsPlaceholder')} {...register('companions')} />
      </FormField>

      <FormField htmlFor="translation" label={t('fields.translation')}>
        <Select
          id="translation"
          options={TRANSLATION_OPTIONS.map((o) => ({ value: o, label: t(`translationOption.${o}`) }))}
          {...register('translation')}
        />
      </FormField>

      <FormField htmlFor="airportPickup" label="">
        <Checkbox id="airportPickup" label={t('fields.airportPickup')} {...register('airportPickup')} />
      </FormField>

      <FormField htmlFor="message" label={t('fields.message')} error={err(errors.message?.message)}>
        <Textarea id="message" error={!!errors.message} placeholder={t('fields.messagePlaceholder')} {...register('message')} />
      </FormField>

      <p className="text-xs text-neutral-500">{t('visaNote')}</p>

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
