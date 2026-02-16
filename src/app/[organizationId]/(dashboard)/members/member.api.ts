import axiosInstance from "@/src/lib/axios"
import { ApiResponse } from "@/src/types/api"
import { QueryParams } from "@/src/types/global"
import { ResponseMembers } from "@/src/types/member"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface ParamsGetMemberInOrganization extends QueryParams {
  organizationId: number
}

const useGetMemberInOrganization = ({
  page,
  page_size,
  search,
  sort_by,
  order_by,
  organizationId
}: ParamsGetMemberInOrganization) => {
  return useQuery({
    queryKey: ["members", { page, page_size, search, sort_by, order_by, organizationId }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page ?? 0 + 1),
        page_size: String(page_size),
        ...(sort_by && { sort_by: sort_by }),
        ...(order_by && { order_by: order_by }),
        ...(search && { search })
      })

      const { data } = await axiosInstance.get<ApiResponse<ResponseMembers>>(
        `/v1/org/${organizationId}/member-list`,
        { params }
      )

      return data.data
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  })
}

export { useGetMemberInOrganization }
