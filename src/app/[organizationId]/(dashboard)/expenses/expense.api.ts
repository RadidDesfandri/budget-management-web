import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { ExpenseStatus, ExpenseWithRelations } from "@/src/types/expense"
import { PaginatedResponse, QueryParams } from "@/src/types/global"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LineChartDataPoint } from "../dashboard/components/charts/expense-line-chart"
import { CreateExpenseData, ExpensePieChart, ExpenseStats, RejectExpenseData } from "./expense.type"

interface ParamsGetExpenses extends QueryParams {
  organizationId: string
  status?: ExpenseStatus
  date_from?: string
  date_to?: string
  category?: string
}

const useListExpenses = ({
  organizationId,
  page,
  page_size,
  sort_by,
  order_by,
  status,
  date_from,
  date_to,
  category,
  search
}: ParamsGetExpenses) => {
  return useQuery({
    queryKey: [
      "expenses",
      organizationId,
      page,
      page_size,
      sort_by,
      order_by,
      status,
      date_from,
      date_to,
      category,
      search
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String((page ?? 0) + 1),
        page_size: String(page_size),
        ...(sort_by && { sort_by: sort_by }),
        ...(order_by && { order_by: order_by }),
        ...(status && { status }),
        ...(date_from && { date_from }),
        ...(date_to && { date_to }),
        ...(category && { category }),
        ...(search && { search })
      })

      const { data } = await axiosInstance.get<
        ApiResponse<PaginatedResponse<ExpenseWithRelations>>
      >(`/v1/org/${organizationId}/expenses`, { params })

      return data.data
    },
    enabled: !!organizationId,
    placeholderData: keepPreviousData
  })
}

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

const useApproveExpense = (organizationId: string) => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, number>({
    mutationFn: async (expenseId: number) => {
      try {
        const { data } = await axiosInstance.post(
          `/v1/org/${organizationId}/expenses/${expenseId}/approve`
        )
        return data
      } catch (err) {
        throw normalizeApiError(err)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.refetchQueries({ queryKey: ["expenses", organizationId] })
      queryClient.refetchQueries({ queryKey: ["expense-stats", organizationId] })
      queryClient.refetchQueries({ queryKey: ["expense-line-chart", organizationId] })
      queryClient.refetchQueries({ queryKey: ["expense-pie-chart", organizationId] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}

const useRejectExpense = (organizationId: string) => {
  const queryClient = useQueryClient()

  return useMutation<
    ApiResponse<null>,
    ApiError,
    { expenseId: number; payload: RejectExpenseData }
  >({
    mutationFn: async ({ expenseId, payload }) => {
      try {
        const { data } = await axiosInstance.post(
          `/v1/org/${organizationId}/expenses/${expenseId}/reject`,
          payload
        )
        return data
      } catch (err) {
        throw normalizeApiError(err)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.refetchQueries({ queryKey: ["expenses", organizationId] })
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

const useExpenseStats = (organizationId: string, filter: string) => {
  return useQuery({
    queryKey: ["expense-stats", organizationId, filter],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<ExpenseStats>>(
        `/v1/org/${organizationId}/expenses/stats?filter=${filter}`
      )
      return data.data
    },
    enabled: !!organizationId,
    placeholderData: keepPreviousData
  })
}

const useExpenseLineChart = (organizationId: string) => {
  return useQuery({
    queryKey: ["expense-line-chart", organizationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<LineChartDataPoint[]>>(
        `/v1/org/${organizationId}/expenses/line-chart`
      )
      return data.data
    },
    enabled: !!organizationId
  })
}

const useExpensePieChart = (organizationId: string) => {
  return useQuery({
    queryKey: ["expense-pie-chart", organizationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<ExpensePieChart[]>>(
        `/v1/org/${organizationId}/expenses/pie-chart`
      )
      return data.data
    },
    enabled: !!organizationId
  })
}

export {
  useApproveExpense,
  useCreateExpense,
  useExpenseLineChart,
  useExpensePieChart,
  useExpenseStats,
  useListExpenses,
  useRejectExpense
}
