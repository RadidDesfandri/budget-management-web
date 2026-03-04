import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateExpenseData } from "./expense.type"
import { useRouter } from "next/navigation"

const useCreateExpense = (organizationId: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation<ApiResponse<null>, ApiError, CreateExpenseData>({
    mutationFn: async (payload: CreateExpenseData) => {
      try {
        const formData = new FormData()

        formData.append("title", payload.title)
        formData.append("amount", payload.amount.toString())
        formData.append("description", payload.description)
        formData.append("category_id", payload.category_id.toString())
        formData.append("expense_date", payload.expense_date)

        if (payload.receipt) {
          formData.append("receipt", payload.receipt)
        }

        const { data } = await axiosInstance.post(
          `/v1/org/${organizationId}/expenses/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )

        return data
      } catch (err) {
        throw normalizeApiError(err)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.refetchQueries({ queryKey: ["expenses", organizationId] })
      router.push(`/${organizationId}/expenses`)
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

export { useCreateExpense }
