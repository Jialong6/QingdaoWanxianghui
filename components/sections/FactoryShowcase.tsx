import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Section, OptimizedImage } from '@/components/ui'
import { FACTORIES } from '@/lib/content/mock/factory'

/**
 * 屏 7：工場と設備（plan.md §5.1）
 * - 双工厂照片墙左右并置
 * - 每个工厂下方：4 个数字指标
 */
export function FactoryShowcase() {
  const t = useTranslations('home.factory')
  const metrics = useTranslations('home.factory.metrics')

  return (
    <Section
      id="factory"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      background="craft"
      containerSize="2xl"
    >
      <div className="grid gap-12 lg:grid-cols-2">
        {FACTORIES.map((f) => (
          <article key={f.id} className="flex flex-col">
            <OptimizedImage
              src={f.image}
              alt={t(`items.${f.id}.name`)}
              width={1200}
              height={800}
              aspect="3:2"
              rounded
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <h3 className="mt-6 text-2xl font-bold text-craft-ink">
              {t(`items.${f.id}.name`)}
            </h3>
            <p className="mt-2 text-sm text-craft-ink/70">{t(`items.${f.id}.subtitle`)}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {f.metrics.map((m) => (
                <div key={m.labelKey} className="rounded bg-neutral-0/60 p-3">
                  <dt className="text-2xs uppercase text-craft-ink/60 tracking-[0.1em]">
                    {metrics(m.labelKey)}
                  </dt>
                  <dd className="mt-1 font-en-sans text-xl font-bold text-craft-ink tabular-nums">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/factory"
          className="inline-flex items-center gap-1 text-sm font-medium text-craft-ink underline underline-offset-4 transition-colors hover:text-craft-leather"
        >
          {t('viewMore')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}
