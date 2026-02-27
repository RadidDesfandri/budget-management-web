import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddBudgetInput } from "./budget.type"
import { toast } from "sonner"
import { ApiError, ApiResponse } from "@/src/types/api"

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

export { useAddBudget }
