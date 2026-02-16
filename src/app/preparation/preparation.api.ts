import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { OrganizationData } from "./preparation.type"
import { useAuth } from "@/src/context/auth-context"

const useCreateOrganization = () => {
  const { refetchUser } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, OrganizationData>({
    mutationFn: async (payload: OrganizationData) => {
      try {
        const formData = new FormData()
        formData.append("name", payload.name)

        if (payload.logo) {
          formData.append("logo", payload.logo)
        }

        const { data } = await axiosInstance.post("/v1/org/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })

        return data
      } catch (err) {
        throw normalizeApiError(err)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      refetchUser()
      queryClient.refetchQueries({ queryKey: ["dropdown-organizations"] })
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

export { useCreateOrganization }
