import { useState, useCallback, useRef } from "react"

export type AcceptedFileType =
  | "image/jpeg"
  | "image/jpg"
  | "image/png"
  | "image/webp"
  | "application/pdf"

export interface UseFileUploadOptions {
  maxSize?: number // in bytes, default 3MB
  accept?: AcceptedFileType[]
  onError?: (error: string) => void
}

export interface FileUploadState {
  file: File | null
  preview: string | null
  isDragging: boolean
  error: string | null
}

export interface UseFileUploadReturn extends FileUploadState {
  inputRef: React.RefObject<HTMLInputElement | null>
  handleFile: (file: File) => boolean
  handleDrop: (e: React.DragEvent<HTMLElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void
  handleDragLeave: () => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  openFilePicker: () => void
  clearFile: () => void
  isImage: boolean
  isPdf: boolean
  fileSizeLabel: string
}

const DEFAULT_MAX_SIZE = 1024 * 1024 * 3 // 3MB
const DEFAULT_ACCEPT: AcceptedFileType[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf"
]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function useFileUpload(options: UseFileUploadOptions = {}): UseFileUploadReturn {
  const { maxSize = DEFAULT_MAX_SIZE, accept = DEFAULT_ACCEPT, onError } = options

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [state, setState] = useState<FileUploadState>({
    file: null,
    preview: null,
    isDragging: false,
    error: null
  })

  const validate = useCallback(
    (file: File): string | null => {
      if (!accept.includes(file.type as AcceptedFileType)) {
        return `File type not allowed. Accepted: ${accept.map((t) => t.split("/")[1]).join(", ")}`
      }
      if (file.size > maxSize) {
        return `File size must be less than ${formatBytes(maxSize)}.`
      }
      return null
    },
    [accept, maxSize]
  )

  const handleFile = useCallback(
    (file: File): boolean => {
      const error = validate(file)
      if (error) {
        setState((prev) => ({ ...prev, error, file: null, preview: null }))
        onError?.(error)
        return false
      }

      const isImageFile = file.type.startsWith("image/")
      const preview = isImageFile ? URL.createObjectURL(file) : null

      setState((prev) => {
        // Revoke old object URL to prevent memory leaks
        if (prev.preview) URL.revokeObjectURL(prev.preview)
        return { file, preview, isDragging: false, error: null }
      })
      return true
    },
    [validate, onError]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()
      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
      else setState((prev) => ({ ...prev, isDragging: false }))
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setState((prev) => ({ ...prev, isDragging: true }))
  }, [])

  const handleDragLeave = useCallback(() => {
    setState((prev) => ({ ...prev, isDragging: false }))
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
      // Reset input so the same file can be re-selected
      e.target.value = ""
    },
    [handleFile]
  )

  const openFilePicker = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const clearFile = useCallback(() => {
    setState((prev) => {
      if (prev.preview) URL.revokeObjectURL(prev.preview)
      return { file: null, preview: null, isDragging: false, error: null }
    })
  }, [])

  const isImage = Boolean(state.file && state.file.type.startsWith("image/"))
  const isPdf = state.file?.type === "application/pdf"
  const fileSizeLabel = state.file ? formatBytes(state.file.size) : ""

  return {
    ...state,
    inputRef,
    handleFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInputChange,
    openFilePicker,
    clearFile,
    isImage,
    isPdf,
    fileSizeLabel
  }
}
