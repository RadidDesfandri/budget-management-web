import { Button } from "@/src/components/ui/button"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface ErrorPageProps {
  statusCode: number
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  showTryAgain?: boolean
  onTryAgain?: () => void
}

export function ErrorPage({
  statusCode,
  title,
  description,
  icon: Icon,
  iconColor = "text-gray-600",
  iconBgColor = "bg-gray-100",
  showTryAgain = false,
  onTryAgain
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className={`rounded-full ${iconBgColor} p-4`}>
            <Icon className={`h-20 w-20 ${iconColor}`} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{statusCode}</h1>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          {showTryAgain && onTryAgain && (
            <Button onClick={onTryAgain} variant="default">
              Try again
            </Button>
          )}
          <Button asChild variant={showTryAgain ? "outline" : "default"}>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
