import { cn } from '@/lib/utils/cn'

export interface TimelineStep {
  /** 步骤主标题 */
  label: string
  /** 副信息（如所要日数 / 拠点），可选 */
  meta?: string
  /** 详细说明，可选 */
  body?: string
}

export interface StepTimelineProps {
  steps: TimelineStep[]
  className?: string
}

/**
 * 编号竖向时间轴（从 oem-flow 页内联 <ol> 抽出，供 quality / lead-time / sampling 复用）
 * - 左侧编号圆点 + primary 竖线
 * - 标题 + 可选 meta + 可选 body
 */
export function StepTimeline({ steps, className }: StepTimelineProps) {
  return (
    <ol className={cn('relative border-l border-neutral-200 pl-8', className)}>
      {steps.map((step, i) => (
        <li key={i} className="relative mb-8 last:mb-0">
          <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-en-sans text-sm font-bold text-neutral-0">
            {i + 1}
          </span>
          <h3 className="text-lg font-bold text-neutral-900">{step.label}</h3>
          {step.meta ? <p className="mt-1 text-sm text-neutral-500">{step.meta}</p> : null}
          {step.body ? <p className="mt-2 text-body text-neutral-700">{step.body}</p> : null}
        </li>
      ))}
    </ol>
  )
}
