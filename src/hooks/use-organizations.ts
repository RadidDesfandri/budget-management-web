import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../lib/axios"
import { ApiError, ApiResponse } from "../types/api"
import { DropdownOrganizationsResponse, SetActiveOrganizationPayload } from "../types/organization"
import { toast } from "sonner"

const useGetDropdownOrganizations = () => {
  return useQuery({
    queryKey: ["dropdown-organizations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<DropdownOrganizationsResponse>>(
        "/v1/organization/dropdown"
      )

      return data
    },
    refetchOnWindowFocus: false
  })
}

const useSetActiveOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, SetActiveOrganizationPayload>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post<ApiResponse<null>>("/v1/organization/set-active", {
        organization_id: payload.organization_id
      })
      return data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.refetchQueries({ queryKey: ["dropdown-organizations"] })
    },
    onError: (err) => {
      if (!err.fieldErrors) {
        toast.error(err.message)
      }
    }
  })
}

export { useGetDropdownOrganizations, useSetActiveOrganization }
