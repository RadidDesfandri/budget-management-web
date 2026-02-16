import { useAuth } from "@/src/context/auth-context"
import { authToken } from "@/src/lib/auth-token"
import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { LoginData, LoginResponse } from "./login.type"

const useLogin = () => {
  const { refetchUser } = useAuth()

  return useMutation<ApiResponse<LoginResponse>, ApiError, Pick<LoginData, "email" | "password">>({
    mutationFn: async (payload: Pick<LoginData, "email" | "password">) => {
      try {
        const { data } = await axiosInstance.post("/v1/login", payload)
        return data
      } catch (err) {
        throw normalizeApiError(err)
      }
    },
    onSuccess: async (data) => {
      if (data.data?.token) {
        authToken.set(data.data.token)
      }

      toast.success(data.message)
      await refetchUser()
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

export { useLogin }
