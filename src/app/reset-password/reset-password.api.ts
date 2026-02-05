import { useMutation } from "@tanstack/react-query"
import { ResetPasswordData } from "./reset-password.type"
import { normalizeApiError } from "@/src/lib/utils"
import { toast } from "sonner"
import axiosInstance from "@/src/lib/axios"
import { ApiError, ApiResponse } from "@/src/types/api"
import { useRouter } from "next/navigation"

interface Payload extends Pick<ResetPasswordData, "password"> {
  id: string
  hash: string
  query: string
}

const useResetPassword = () => {
  const router = useRouter()

  return useMutation<ApiResponse<null>, ApiError, Payload>({
    mutationFn: async (payload: Payload) => {
      try {
        const { data } = await axiosInstance.post(
          `/v1/reset-password/${payload.id}/${payload.hash}?${payload.query}`,
          {
            password: payload.password
          }
        )
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      router.push("/login")
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

export { useResetPassword }
