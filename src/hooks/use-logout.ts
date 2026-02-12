import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { authToken } from "../lib/auth-token"
import { useRouter } from "next/navigation"
import { ApiError, ApiResponse } from "../types/api"
import { normalizeApiError } from "../lib/utils"
import axiosInstance from "../lib/axios"
import { useAuth } from "../context/auth-context"

const useLogout = () => {
  const router = useRouter()
  const { logout: clearAuthCache } = useAuth()

  return useMutation<ApiResponse<null>, ApiError>({
    mutationFn: async () => {
      try {
        const { data } = await axiosInstance.post("/v1/logout")
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      authToken.remove()

      clearAuthCache()

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

export { useLogout }
