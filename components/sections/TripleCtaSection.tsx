import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Section, Card, Button } from '@/components/ui'
import { CTA_CARDS } from '@/lib/content/mock/cta'

/**
 * 屏 9：三联 CTA（plan.md §5.1）
 * - 询盘 / カタログ DL / 工場見学 三个并列大块
 * - 桌面 3 列 / 移动纵向
 */
export function TripleCtaSection() {
  const t = useTranslations('home.cta')

  return (
    <Section
      id="cta"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      align="center"
      background="primary"
      containerSize="2xl"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {CTA_CARDS.map((c, idx) => (
          <Card
            key={c.id}
            padding="lg"
            className="flex flex-col bg-neutral-0/95 text-center"
          >
            <h3 className="text-xl font-bold text-neutral-900">
              {t(`items.${c.id}.title`)}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
              {t(`items.${c.id}.desc`)}
            </p>
            <div className="mt-6">
              <Link href={c.href} className="inline-block">
                <Button variant={idx === 0 ? 'primary' : 'secondary'} size="md" type="button">
                  {t(`items.${c.id}.cta`)}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
