import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormField, Input, Textarea, Select, Checkbox, CheckboxGroup } from './index'

describe('FormField', () => {
  it('渲染 label + 控件', () => {
    render(
      <FormField htmlFor="x" label="御社名">
        <input id="x" />
      </FormField>
    )
    expect(screen.getByText('御社名')).toBeInTheDocument()
  })

  it('required 显示星号', () => {
    render(
      <FormField htmlFor="x" label="名前" required>
        <input id="x" />
      </FormField>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('error 显示在 role=alert', () => {
    render(
      <FormField htmlFor="x" label="メール" error="必須です">
        <input id="x" />
      </FormField>
    )
    expect(screen.getByRole('alert')).toHaveTextContent('必須です')
  })
})

describe('Input', () => {
  it('error 态设置 aria-invalid + border-error', () => {
    render(<Input error aria-label="i" />)
    const input = screen.getByLabelText('i')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input.className).toMatch(/border-error/)
  })

  it('接受用户输入', async () => {
    const user = userEvent.setup()
    render(<Input aria-label="i" />)
    await user.type(screen.getByLabelText('i'), 'hello')
    expect(screen.getByLabelText('i')).toHaveValue('hello')
  })
})

describe('Textarea', () => {
  it('渲染 + 接受输入', async () => {
    const user = userEvent.setup()
    render(<Textarea aria-label="t" />)
    await user.type(screen.getByLabelText('t'), 'abc')
    expect(screen.getByLabelText('t')).toHaveValue('abc')
  })
})

describe('Select', () => {
  it('渲染 options + placeholder', () => {
    render(
      <Select
        aria-label="s"
        placeholder="選択"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]}
      />
    )
    expect(screen.getByRole('option', { name: '選択' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'A' })).toBeInTheDocument()
  })
})

describe('Checkbox', () => {
  it('点击切换选中', async () => {
    const user = userEvent.setup()
    render(<Checkbox id="c" label="同意します" />)
    const cb = screen.getByRole('checkbox')
    expect(cb).not.toBeChecked()
    await user.click(cb)
    expect(cb).toBeChecked()
  })
})

describe('CheckboxGroup', () => {
  it('受控选中 + toggle 调用 onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CheckboxGroup
        value={['a']}
        onChange={onChange}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]}
      />
    )
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).toBeChecked()
    await user.click(checkboxes[1])
    expect(onChange).toHaveBeenCalledWith(['a', 'b'])
  })

  it('取消已选项', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CheckboxGroup
        value={['a']}
        onChange={onChange}
        options={[{ value: 'a', label: 'A' }]}
      />
    )
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith([])
  })
})
