import axiosInstance from "@/src/lib/axios"
import { ApiResponse } from "@/src/types/api"
import { PaginatedResponse, QueryParams } from "@/src/types/global"
import { InvitationData, InvitationStatus } from "@/src/types/invitation"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface ParamsGetInvitations extends Pick<QueryParams, "page" | "page_size"> {
  status?: InvitationStatus
  enabled?: boolean
}

const useGetInvitations = ({
  page = 0,
  page_size = 10,
  status = "pending",
  enabled = true
}: ParamsGetInvitations = {}) => {
  return useQuery({
    queryKey: ["invitations", page, page_size, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page + 1),
        page_size: String(page_size),
        status
      })

      const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<InvitationData>>>(
        "/v1/org/invitation/list",
        { params }
      )

      return data.data
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled
  })
}

export { useGetInvitations }
