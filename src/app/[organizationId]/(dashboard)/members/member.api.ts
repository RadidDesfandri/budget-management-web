import axiosInstance from "@/src/lib/axios"
import { ApiError, ApiResponse } from "@/src/types/api"
import { QueryParams } from "@/src/types/global"
import { ResponseMembers } from "@/src/types/member"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { InviteMemberInput } from "./member.type"
import { normalizeApiError } from "@/src/lib/utils"
import { toast } from "sonner"

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
    queryKey: ["members", organizationId, page, page_size, search, sort_by, order_by],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String((page ?? 0) + 1),
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

const useInviteMember = (organizationId: string) => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, InviteMemberInput>({
    mutationFn: async (payload: InviteMemberInput) => {
      try {
        const { data } = await axiosInstance.post(
          `/v1/org/${organizationId}/invitation/create`,
          payload
        )

        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members", Number(organizationId)]
      })

      toast.success("Invitation sent successfully")
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

export { useGetMemberInOrganization, useInviteMember }
