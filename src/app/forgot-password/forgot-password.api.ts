import { ApiError, ApiResponse } from "@/src/types/api"
import { useMutation } from "@tanstack/react-query"
import { normalizeApiError } from "@/src/lib/utils"
import axiosInstance from "@/src/lib/axios"
import { toast } from "sonner"
import { ForgotPasswordData } from "./forgot-password.type"

const useForgotPassword = () => {
  return useMutation<ApiResponse<null>, ApiError, ForgotPasswordData>({
    mutationFn: async (payload: ForgotPasswordData) => {
      try {
        const { data } = await axiosInstance.post("/v1/forgot-password", payload)
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

export { useForgotPassword }
