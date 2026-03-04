"use client"

import { useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-50 p-4">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">500</h1>
          <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>
          <p className="text-sm text-gray-600">
            An unexpected error occurred. Please try again or contact support if the problem
            persists.
          </p>
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
