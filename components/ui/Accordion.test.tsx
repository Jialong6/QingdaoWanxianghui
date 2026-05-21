import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionItem } from './Accordion'

describe('Accordion', () => {
  it('渲染标题与展开内容', () => {
    render(
      <Accordion>
        <AccordionItem question="MOQ は？">国内：几百件起 / 缅甸：1,500 件起</AccordionItem>
      </Accordion>
    )
    expect(screen.getByText('MOQ は？')).toBeInTheDocument()
    expect(screen.getByText(/缅甸/)).toBeInTheDocument()
  })

  it('点击 summary 展开 / 收起 details', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem question="Q?">A</AccordionItem>
      </Accordion>
    )
    const details = screen.getByText('Q?').closest('details')!
    expect(details.open).toBe(false)
    await user.click(screen.getByText('Q?'))
    expect(details.open).toBe(true)
  })

  it('defaultOpen=true 默认展开', () => {
    render(
      <Accordion>
        <AccordionItem question="Q" defaultOpen>
          A
        </AccordionItem>
      </Accordion>
    )
    const details = screen.getByText('Q').closest('details')!
    expect(details.open).toBe(true)
  })

  it('多个 AccordionItem 渲染', () => {
    render(
      <Accordion>
        <AccordionItem question="Q1">A1</AccordionItem>
        <AccordionItem question="Q2">A2</AccordionItem>
      </Accordion>
    )
    expect(screen.getByText('Q1')).toBeInTheDocument()
    expect(screen.getByText('Q2')).toBeInTheDocument()
  })

  it('summary 包含 +/- 切换图标（aria-hidden 装饰）', () => {
    const { container } = render(
      <Accordion>
        <AccordionItem question="Q">A</AccordionItem>
      </Accordion>
    )
    const icons = container.querySelectorAll('[aria-hidden="true"]')
    expect(icons.length).toBeGreaterThan(0)
  })
})
