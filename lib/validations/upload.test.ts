import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import {
  validateFile,
  validateFileList,
  MAX_FILE_SIZE,
  MAX_FILES,
  ALLOWED_EXTENSIONS
} from './upload'

const goodFile = { name: 'design.pdf', size: 1024, type: 'application/pdf' }

describe('validateFile', () => {
  it('合法文件返回 null', () => {
    expect(validateFile(goodFile)).toBeNull()
  })

  it('超过 10MB 返回 fileTooLarge', () => {
    expect(validateFile({ ...goodFile, size: MAX_FILE_SIZE + 1 })).toBe('fileTooLarge')
  })

  it('非白名单扩展名返回 invalidFileType', () => {
    expect(validateFile({ name: 'virus.exe', size: 10, type: 'application/x-msdownload' })).toBe(
      'invalidFileType'
    )
  })

  it('接受 .ai / .psd（MIME 可能为空）', () => {
    expect(validateFile({ name: 'art.ai', size: 10, type: '' })).toBeNull()
    expect(validateFile({ name: 'photo.psd', size: 10, type: '' })).toBeNull()
  })

  it('扩展名大小写不敏感', () => {
    expect(validateFile({ name: 'IMG.JPG', size: 10, type: 'image/jpeg' })).toBeNull()
  })
})

describe('validateFileList', () => {
  it('空列表合法', () => {
    expect(validateFileList([])).toBeNull()
  })

  it('超过 5 个返回 tooManyFiles', () => {
    const six = Array.from({ length: 6 }, () => goodFile)
    expect(validateFileList(six)).toBe('tooManyFiles')
  })

  it('列表含非法文件返回该错误', () => {
    expect(validateFileList([goodFile, { name: 'a.exe', size: 1, type: '' }])).toBe(
      'invalidFileType'
    )
  })

  describe('property-based', () => {
    it('Property: 任意 size > 10MB 必返回 fileTooLarge', () => {
      fc.assert(
        fc.property(fc.integer({ min: MAX_FILE_SIZE + 1, max: MAX_FILE_SIZE * 10 }), (size) => {
          expect(validateFile({ name: 'a.pdf', size, type: 'application/pdf' })).toBe('fileTooLarge')
        }),
        { numRuns: 30 }
      )
    })

    it('Property: 合法扩展名 + 合法大小始终通过', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...ALLOWED_EXTENSIONS),
          fc.integer({ min: 0, max: MAX_FILE_SIZE }),
          (ext, size) => {
            expect(validateFile({ name: `f.${ext}`, size, type: '' })).toBeNull()
          }
        ),
        { numRuns: 50 }
      )
    })

    it('Property: 文件数 > MAX_FILES 必返回 tooManyFiles', () => {
      fc.assert(
        fc.property(fc.integer({ min: MAX_FILES + 1, max: 20 }), (n) => {
          const files = Array.from({ length: n }, () => goodFile)
          expect(validateFileList(files)).toBe('tooManyFiles')
        }),
        { numRuns: 20 }
      )
    })
  })
})
