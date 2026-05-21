import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Button, Container, Heading, OptimizedImage } from '@/components/ui'

// XXX-TODO: 待客户提供 Hero 实拍（工厂车间 / 手部特写 / 缝纫线穿过面料），暂用 placeholder
const HERO_IMAGE = 'https://placehold.co/1920x1080/1A3B5B/FAFAF7?text=Factory+Hero'

/**
 * 屏 1：Hero（plan.md §5.1）
 * - 大图（左/全屏背景）+ slogan + subheadline + 双 CTA
 * - 桌面：左文字 / 右图，移动：图压底色
 */
export function HeroBanner() {
  const t = useTranslations('home.hero')

  return (
    <section id="hero" className="relative overflow-hidden bg-neutral-50">
      <Container size="2xl" className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-32">
        <div className="relative z-10">
          <Heading
            level={1}
            size="hero"
            eyebrow={t('eyebrow')}
            subtitle={t('subheadline')}
          >
            {t('headline')}
          </Heading>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact/inquiry">
              <Button variant="primary" size="lg" type="button">
                {t('primaryCta')}
              </Button>
            </Link>
            <Link href="/contact/catalog">
              <Button variant="secondary" size="lg" type="button">
                {t('secondaryCta')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <OptimizedImage
            src={HERO_IMAGE}
            alt={t('imageAlt')}
            width={1600}
            height={1200}
            aspect="4:3"
            rounded
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Container>
    </section>
  )
}
