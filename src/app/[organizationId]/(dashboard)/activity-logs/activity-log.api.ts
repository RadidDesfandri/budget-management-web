import axiosInstance from "@/src/lib/axios"
import { ApiResponse } from "@/src/types/api"
import { PaginatedResponse } from "@/src/types/global"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ActivityLog, ActivityLogActionType } from "./activity-log.type"

interface ParamsGetAuditTrails {
  organizationId: string
  action_type?: ActivityLogActionType
  user_id?: string
  date_from?: string
  date_to?: string
  search?: string
  page_size?: number
}

export const useGetAuditTrails = ({
  organizationId,
  action_type,
  user_id,
  date_from,
  date_to,
  search,
  page_size = 10
}: ParamsGetAuditTrails) => {
  return useInfiniteQuery({
    queryKey: [
      "audit-trails",
      organizationId,
      action_type,
      user_id,
      date_from,
      date_to,
      search,
      page_size
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        page_size: String(page_size),
        ...(user_id && { user_id }),
        ...(action_type && { action_type }),
        ...(date_from && { date_from }),
        ...(date_to && { date_to }),
        ...(search && { search })
      })

      const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<ActivityLog>>>(
        `/v1/org/${organizationId}/audit-trails`,
        { params }
      )

      return data.data
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1
      }
      return undefined
    },
    enabled: !!organizationId
  })
}
