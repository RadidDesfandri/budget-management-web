import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AddBudgetInput, BudgetResponse } from "./budget.type"
import { toast } from "sonner"
import { ApiError, ApiResponse } from "@/src/types/api"
import { QueryParams } from "@/src/types/global"

interface ParamsGetBudget extends Omit<QueryParams, "search"> {
  organizationId: string
  period: string
}

const useGetBudget = ({
  organizationId,
  page,
  page_size,
  sort_by,
  order_by,
  period
}: ParamsGetBudget) => {
  return useQuery({
    queryKey: ["budgets", organizationId, page, page_size, sort_by, order_by, period],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String((page ?? 0) + 1),
        page_size: String(page_size),
        ...(sort_by && { sort_by: sort_by }),
        ...(order_by && { order_by: order_by }),
        ...(period && { period })
      })

      const { data } = await axiosInstance.get<ApiResponse<BudgetResponse>>(
        `/v1/org/${organizationId}/budget`,
        { params }
      )

      return data.data
    },
    enabled: !!organizationId,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  })
}

const useAddBudget = (organizationId: string) => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, AddBudgetInput>({
    mutationFn: async (payload: AddBudgetInput) => {
      try {
        const { data } = await axiosInstance.post(`/v1/org/${organizationId}/budget/create`, {
          ...payload,
          month: `${payload.month.year}-${String(payload.month.month + 1).padStart(2, "0")}`,
          amount: payload.amount
        })

        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["budgets", organizationId] })
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

export { useAddBudget, useGetBudget }
