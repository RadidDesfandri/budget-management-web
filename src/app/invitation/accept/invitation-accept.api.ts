import { useAuth } from "@/src/context/auth-context"
import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { InvitationData } from "@/src/types/invitation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useAcceptInvitation = () => {
  const queryClient = useQueryClient()
  const { refetchUser } = useAuth()

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
      refetchUser()
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["invitations"] })
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

const useDeclineInvitation = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: async (token: string) => {
      const { data } = await axiosInstance.post(`/v1/org/invitation/reject?token=${token}`)
      return data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["invitations"] })
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

const useGetVerifyTokenInvitation = (token: string) => {
  return useQuery({
    queryKey: ["verify-token-invitation", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<InvitationData>>(
        `/v1/org/invitation/verify?token=${token}`
      )
      return data
    },
    retry: false,
    enabled: !!token,
    refetchOnWindowFocus: false
  })
}

export { useAcceptInvitation, useDeclineInvitation, useGetVerifyTokenInvitation }
