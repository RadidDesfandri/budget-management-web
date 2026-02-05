import { useMutation } from "@tanstack/react-query"
import { LoginData, LoginResponse } from "./login.type"
import { ApiError, ApiResponse } from "@/src/types/api"
import { normalizeApiError } from "@/src/lib/utils"
import axiosInstance from "@/src/lib/axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { authToken } from "@/src/lib/auth-token"

const useLogin = () => {
  const router = useRouter()

  return useMutation<ApiResponse<LoginResponse>, ApiError, Pick<LoginData, "email" | "password">>({
    mutationFn: async (payload: Pick<LoginData, "email" | "password">) => {
      try {
        const { data } = await axiosInstance.post("/v1/login", payload)
        return data
      } catch (err) {
        throw normalizeApiError(err)
      }
    },
    onSuccess: (data) => {
      if (data.data?.token) {
        authToken.set(data.data.token)
      }

      toast.success(data.message)
      router.push("/dashboard")
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

export { useLogin }
