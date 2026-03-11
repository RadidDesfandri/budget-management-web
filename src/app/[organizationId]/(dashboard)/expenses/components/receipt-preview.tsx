import { Button } from "@/src/components/ui/button"
import { Label } from "@/src/components/ui/label"
import Link from "next/link"
import { FiDownload, FiEye, FiFile, FiFileText } from "react-icons/fi"

function getReceiptType(url: string): "image" | "pdf" | "other" {
  const lower = url.toLowerCase()
  if (lower.match(/\.(jpg|jpeg|png|webp)$/)) return "image"
  if (lower.endsWith(".pdf")) return "pdf"
  return "other"
}

function getFileName(url: string): string {
  return url.split("/").pop() ?? "file"
}

interface ReceiptPreviewProps {
  receiptUrl: string
  fullReceiptUrl: string
}

function ReceiptPreview({ receiptUrl, fullReceiptUrl }: ReceiptPreviewProps) {
  const type = getReceiptType(receiptUrl)
  const fileName = getFileName(receiptUrl)

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-muted-foreground uppercase">Receipt</Label>

      {type === "image" ? (
        <div className="group relative rounded-md border-2 border-dashed p-2 transition-all duration-200 hover:border-blue-400 hover:bg-blue-100">
          <img
            alt="receipt"
            src={fullReceiptUrl}
            className="h-full w-full rounded-md object-cover"
          />
          <div className="absolute inset-2 flex items-center justify-center rounded-md bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button asChild size="sm" variant="secondary">
              <Link href={fullReceiptUrl} target="_blank" rel="noopener noreferrer">
                <FiEye className="h-4 w-4" />
                View full receipt
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-md border-2 border-dashed p-3">
          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
            {type === "pdf" ? (
              <FiFileText className="h-5 w-5 text-red-500" />
            ) : (
              <FiFile className="text-muted-foreground h-5 w-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{fileName}</p>
            <p className="text-muted-foreground text-xs uppercase">
              {type === "pdf" ? "PDF Document" : "File"}
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href={fullReceiptUrl} download={fileName} target="_blank">
              <FiDownload className="mr-2 h-4 w-4" />
              Download
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ReceiptPreview
