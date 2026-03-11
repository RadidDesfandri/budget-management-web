import { useEffect, useState } from "react"
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { FileText, ImageIcon, Paperclip, Trash2, UploadCloud } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import { FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { useFileUpload, type UseFileUploadOptions } from "@/src/hooks/use-file-upload"

interface ReceiptUploadProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label?: string
  disabled?: boolean
  options?: UseFileUploadOptions
  existingReceiptUrl?: string
}

export function ReceiptUpload<T extends FieldValues>({
  control,
  name,
  label = "Receipt",
  disabled = false,
  options,
  existingReceiptUrl
}: ReceiptUploadProps<T>) {
  const { field } = useController({ control, name })
  const [existingRemoved, setExistingRemoved] = useState(false)

  const {
    file,
    preview,
    isDragging,
    error: uploadError,
    inputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInputChange,
    openFilePicker,
    clearFile,
    isImage,
    isPdf,
    fileSizeLabel
  } = useFileUpload(options)

  useEffect(() => {
    field.onChange(file ?? undefined)
  }, [file]) // eslint-disable-line react-hooks/exhaustive-deps

  const acceptString =
    options?.accept?.join(",") ?? "image/jpeg,image/jpg,image/png,image/webp,application/pdf"

  const hasExisting = !!existingReceiptUrl && !existingRemoved
  const displayFile = file
  const showDropzone = !displayFile && !hasExisting

  const displayPreview = preview ?? (hasExisting ? existingReceiptUrl : undefined)
  const isExistingPdf = hasExisting && !displayFile && existingReceiptUrl?.endsWith(".pdf")
  const showImagePreview = (isImage && preview) || (hasExisting && !displayFile && !isExistingPdf)

  function handleRemove() {
    if (displayFile) {
      clearFile()
    } else if (hasExisting) {
      setExistingRemoved(true)
      field.onChange(undefined)
    }
  }

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>

      <input
        ref={inputRef}
        type="file"
        accept={acceptString}
        className="hidden"
        disabled={disabled}
        onChange={handleInputChange}
      />

      {showDropzone ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload receipt"
          onClick={disabled ? undefined : openFilePicker}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) openFilePicker()
          }}
          onDrop={disabled ? undefined : handleDrop}
          onDragOver={disabled ? undefined : handleDragOver}
          onDragLeave={disabled ? undefined : handleDragLeave}
          className={cn(
            "border-input bg-background hover:bg-accent/40 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-8 text-center transition-colors",
            isDragging && "border-primary bg-primary/5",
            disabled && "cursor-not-allowed opacity-50",
            uploadError && "border-destructive"
          )}
        >
          <div className="bg-muted rounded-full p-3">
            <UploadCloud className="text-muted-foreground size-6" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Drop your file here, or{" "}
              <span className="text-primary underline underline-offset-2">browse</span>
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              JPG, JPEG, PNG, WEBP or PDF — max 3 MB
            </p>
          </div>
        </div>
      ) : (
        <div className="border-input rounded-md border">
          {showImagePreview && displayPreview ? (
            <div className="relative">
              <img
                src={displayPreview}
                alt="Receipt preview"
                className="h-48 w-full rounded-t-md object-cover"
              />
            </div>
          ) : (
            <div className="bg-muted/40 flex items-center gap-3 rounded-t-md px-4 py-3">
              {isPdf || isExistingPdf ? (
                <FileText className="text-destructive size-8 shrink-0" />
              ) : (
                <ImageIcon className="text-primary size-8 shrink-0" />
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {displayFile?.name ?? existingReceiptUrl?.split("/").pop()}
                </p>
                {fileSizeLabel && <p className="text-muted-foreground text-xs">{fileSizeLabel}</p>}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 rounded-b-md px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <Paperclip className="text-muted-foreground size-3.5 shrink-0" />
              <span className="text-muted-foreground truncate text-xs">
                {displayFile?.name ?? existingReceiptUrl?.split("/").pop()}
              </span>
              {fileSizeLabel && (
                <span className="text-muted-foreground text-xs">· {fileSizeLabel}</span>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive size-7 shrink-0"
              disabled={disabled}
              onClick={handleRemove}
              aria-label="Remove file"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Show hook-level upload errors (type/size) alongside RHF errors */}
      {uploadError && <p className="text-destructive text-sm font-medium">{uploadError}</p>}
      <FormMessage />
    </FormItem>
  )
}
