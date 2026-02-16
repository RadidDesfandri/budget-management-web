import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { RegisterData, RegisterResponse } from "./register.type"

const useRegister = () => {
  return useMutation<
    ApiResponse<RegisterResponse>,
    ApiError,
    Pick<RegisterData, "email" | "password" | "name">
  >({
    mutationFn: async (payload: Pick<RegisterData, "email" | "password" | "name">) => {
      try {
        const { data } = await axiosInstance.post("/v1/register", payload)
        return data
      } catch (err) {
        throw normalizeApiError(err)
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

export { useRegister }
