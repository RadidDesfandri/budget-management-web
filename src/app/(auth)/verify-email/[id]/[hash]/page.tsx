"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/src/components/ui/spinner"
import { MdError } from "react-icons/md"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { FaRegCircleCheck } from "react-icons/fa6"
import { useEffect } from "react"
import { useVerifyEmail } from "../../verify-email.api"

function VerifyEmail() {
  const { id, hash } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { status, data, error } = useVerifyEmail(
    id as string,
    hash as string,
    searchParams.toString()
  )

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        router.push("/login")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [status, router])

  const getErrorMessage = () => {
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = error as any

      if (axiosError?.response?.data?.error) {
        return axiosError.response.data.error
      }

      if (axiosError?.response?.data?.message) {
        return axiosError.response.data.message
      }

      return "An error occurred while verifying email"
    }

    return "The verification link is incorrect or has expired."
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {status === "pending" && (
        <div className="text-center">
          <div className="mb-4">
            <Spinner className="mx-auto h-16 w-16" />
          </div>
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <div className="mb-4">
            <FaRegCircleCheck className="mx-auto h-16 w-16 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-green-600">
            {data?.message || "Verifikasi Berhasil!"}
          </h1>
          <p className="text-gray-600">Your email has been verified. Redirecting to login...</p>
          <Button
            onClick={() => router.push("/login")}
            variant="secondary"
            size="lg"
            className="mt-4"
          >
            Click here if not automatically redirected
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-md text-center">
          <div className="mb-4">
            <MdError className="text-destructive mx-auto h-16 w-16" />
          </div>
          <h1 className="text-destructive mb-2 text-2xl font-bold">Verification Failed!</h1>
          <p className="mb-4 text-gray-700">{getErrorMessage()}</p>
          <Link href="/login">
            <Button variant="secondary" size="lg">
              Back to Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail
