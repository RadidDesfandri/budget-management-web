import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../lib/axios"
import { ApiResponse } from "../types/api"
import { DropdownOrganizationsResponse } from "../types/organization"
import { setCurrentOrganization } from "../lib/org-session"

const useGetDropdownOrganizations = (organizationId: number) => {
  return useQuery({
    queryKey: ["dropdown-organizations", organizationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<DropdownOrganizationsResponse>>(
        `/v1/org/${organizationId}/dropdown`
      )

      const newOrgId = data.data?.meta.active_organization_id
      if (newOrgId && newOrgId !== organizationId) {
        setCurrentOrganization(String(newOrgId))
      }

      return data
    },
    refetchOnWindowFocus: false
  })
}

export { useGetDropdownOrganizations }
