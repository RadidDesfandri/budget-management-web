"use client"

import { useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { AlertCircle, WifiOff, ServerCrash } from "lucide-react"

type ErrorType = "SERVICE_UNAVAILABLE" | "INTERNAL_SERVER_ERROR" | "UNKNOWN"

function getErrorConfig(message: string): {
  type: ErrorType
  icon: React.ReactNode
  code: string
  title: string
  description: string
} {
  switch (message) {
    case "SERVICE_UNAVAILABLE":
      return {
        type: "SERVICE_UNAVAILABLE",
        icon: <WifiOff className="h-12 w-12 text-red-600" />,
        code: "503",
        title: "Service Unavailable",
        description:
          "The server is temporarily unreachable or timed out. Please wait a moment and try again."
      }
    case "INTERNAL_SERVER_ERROR":
      return {
        type: "INTERNAL_SERVER_ERROR",
        icon: <ServerCrash className="h-12 w-12 text-red-600" />,
        code: "500",
        title: "Internal Server Error",
        description:
          "An unexpected error occurred on the server. Please try again or contact support if the problem persists."
      }
    default:
      return {
        type: "UNKNOWN",
        icon: <AlertCircle className="h-12 w-12 text-red-600" />,
        code: "500",
        title: "Something went wrong",
        description:
          "An unexpected error occurred. Please try again or contact support if the problem persists."
      }
  }
}

export default function OrganizationError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const { icon, code, title, description } = getErrorConfig(error.message)

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-50 p-4">{icon}</div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{code}</h1>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
