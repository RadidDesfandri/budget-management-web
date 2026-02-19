import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { VerifyTokenInvitationResponse } from "./actions"

const useAcceptInvitation = () => {
  const router = useRouter()

  return useMutation<ApiResponse<{ organization_id: number }>, ApiError, string>({
    mutationFn: async (token: string) => {
      try {
        const { data } = await axiosInstance.post(`/v1/org/invitation/accept?token=${token}`)

        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      router.push(`/${data.data?.organization_id}/dashboard`)
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        if (error.message === "Unauthorized") {
          toast.error("Please login to accept invitation")
          return
        }

        toast.error(error.message)
      }
    }
  })
}

const useGetVerifyTokenInvitation = (token: string) => {
  return useQuery({
    queryKey: ["verify-token-invitation", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<VerifyTokenInvitationResponse>>(
        `/v1/org/invitation/verify?token=${token}`
      )
      return data
    },
    retry: false,
    enabled: !!token,
    refetchOnWindowFocus: false
  })
}

export { useAcceptInvitation, useGetVerifyTokenInvitation }
