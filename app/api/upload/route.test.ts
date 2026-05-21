import { describe, it, expect } from 'vitest'
import { POST } from './route'
import { MAX_FILE_SIZE } from '@/lib/validations/upload'

/** 构造 File-like（精确控制 name/size/type，绕过 FormData body 往返对 size 的重算） */
function fakeFile(name: string, size: number, type = 'application/pdf') {
  return { name, size, type } as unknown as File
}

/** 构造 mock NextRequest：headers.get + formData() 完全可控 */
function makeRequest(files: File[], ip = '20.0.0.1') {
  const headers = new Headers({ 'x-forwarded-for': ip })
  const form = {
    getAll: (key: string) => (key === 'files' ? files : [])
  } as unknown as FormData
  return {
    headers,
    formData: async () => form
  } as unknown as Parameters<typeof POST>[0]
}

describe('POST /api/upload', () => {
  it('合法文件返回 200 + 元信息', async () => {
    const res = await POST(makeRequest([fakeFile('a.pdf', 1024)], '20.0.0.10'))
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.data).toHaveLength(1)
    expect(json.data[0]).toMatchObject({ name: 'a.pdf', size: 1024 })
  })

  it('超大文件返回 400 fileTooLarge', async () => {
    const res = await POST(makeRequest([fakeFile('big.pdf', MAX_FILE_SIZE + 1)], '20.0.0.11'))
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.error).toBe('fileTooLarge')
  })

  it('非法类型返回 400 invalidFileType', async () => {
    const res = await POST(
      makeRequest([fakeFile('x.exe', 10, 'application/x-msdownload')], '20.0.0.12')
    )
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.error).toBe('invalidFileType')
  })

  it('超过 5 个返回 400 tooManyFiles', async () => {
    const files = Array.from({ length: 6 }, (_, i) => fakeFile(`f${i}.pdf`, 100))
    const res = await POST(makeRequest(files, '20.0.0.13'))
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.error).toBe('tooManyFiles')
  })

  it('空文件列表合法（返回空数组）', async () => {
    const res = await POST(makeRequest([], '20.0.0.14'))
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.data).toEqual([])
  })
})
