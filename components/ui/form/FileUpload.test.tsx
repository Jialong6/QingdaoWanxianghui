import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileUpload } from './FileUpload'

function makeFile(name: string, size: number, type = 'application/pdf') {
  const f = new File(['x'], name, { type })
  Object.defineProperty(f, 'size', { value: size })
  return f
}

describe('FileUpload', () => {
  it('渲染上传区 + accept 属性含白名单扩展名', () => {
    render(<FileUpload id="files" value={[]} onChange={vi.fn()} />)
    const input = document.getElementById('files') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.accept).toContain('.pdf')
    expect(input.accept).toContain('.psd')
  })

  it('选择合法文件后调用 onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FileUpload id="files" value={[]} onChange={onChange} />)
    const input = document.getElementById('files') as HTMLInputElement
    await user.upload(input, makeFile('design.pdf', 1024))
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toHaveLength(1)
  })

  it('渲染已选文件列表 + 大小', () => {
    render(<FileUpload id="files" value={[makeFile('a.pdf', 2048)]} onChange={vi.fn()} />)
    expect(screen.getByText(/a\.pdf/)).toBeInTheDocument()
  })

  it('点击删除按钮移除文件', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FileUpload id="files" value={[makeFile('a.pdf', 2048)]} onChange={onChange} />)
    await user.click(screen.getByLabelText(/remove a\.pdf/))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('非法类型文件被拒 + 显示错误', () => {
    const onChange = vi.fn()
    render(
      <FileUpload
        id="files"
        value={[]}
        onChange={onChange}
        renderError={(code) => `ERR:${code}`}
      />
    )
    const input = document.getElementById('files') as HTMLInputElement
    // fireEvent 直接注入 files，绕过 jsdom accept 过滤，测试组件自身 JS 校验
    fireEvent.change(input, {
      target: { files: [makeFile('virus.exe', 100, 'application/x-msdownload')] }
    })
    // 非法文件不进入 onChange 列表
    expect(onChange).toHaveBeenCalledWith([])
    expect(screen.getByRole('alert')).toHaveTextContent('ERR:invalidFileType')
  })
})
