/** 文件上传约束（plan.md §5.13.2 + §9.2） */

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
export const MAX_FILES = 5

export const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'psd'] as const

export const ALLOWED_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/postscript', // .ai
  'application/illustrator', // .ai (alt)
  'image/vnd.adobe.photoshop', // .psd
  'application/octet-stream' // .ai/.psd 有时被识别为通用二进制
] as const

export type UploadErrorCode = 'fileTooLarge' | 'invalidFileType' | 'tooManyFiles'

/** 元信息（上传后传给 inquiry 的形态） */
export interface AttachmentMeta {
  name: string
  size: number
  type: string
}

function getExtension(name: string): string {
  const idx = name.lastIndexOf('.')
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : ''
}

/** 校验单个文件，返回错误 code（合法返回 null）
 * - 扩展名白名单为主判据（.ai/.psd 的 MIME 在浏览器中不可靠）
 */
export function validateFile(file: { name: string; size: number; type: string }): UploadErrorCode | null {
  if (file.size > MAX_FILE_SIZE) return 'fileTooLarge'
  const ext = getExtension(file.name)
  if (!(ALLOWED_EXTENSIONS as readonly string[]).includes(ext)) return 'invalidFileType'
  return null
}

/** 校验文件列表，返回首个错误 code（合法返回 null） */
export function validateFileList(
  files: Array<{ name: string; size: number; type: string }>
): UploadErrorCode | null {
  if (files.length > MAX_FILES) return 'tooManyFiles'
  for (const f of files) {
    const e = validateFile(f)
    if (e) return e
  }
  return null
}
