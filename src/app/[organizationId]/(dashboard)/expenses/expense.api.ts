import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateExpenseData, RejectExpenseData } from "./expense.type"
import { useRouter } from "next/navigation"
import { PaginatedResponse, QueryParams } from "@/src/types/global"
import { ExpenseStatus, ExpenseWithRelations } from "@/src/types/expense"

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
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
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

const useExpenseStats = (_organizationId: string) => {
  return {
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: {
      total_expenses: {
        amount: 120000,
        percent_change: 12,
        trend: "up"
      },
      pending_approvals: {
        count: 8
      },
      approved_expenses: {
        count: 142,
        period: "this_month"
      },
      remaining_budget: {
        amount: 60000,
        allocated: 180000
      }
    },
    error: null,
    statusCode: 200
  }
  // return useQuery({
  //   queryKey: ["expense-stats", organizationId],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get<ApiResponse<ExpenseStats>>(
  //       `/v1/org/${organizationId}/expenses/stats`
  //     )
  //     return data.data
  //   },
  //   enabled: !!organizationId,
  //   refetchOnWindowFocus: false
  // })
}

const useExpenseLineChart = (_organizationId: string) => {
  return {
    success: true,
    message: "Expense trend retrieved successfully",
    data: [
      { label: "Jan", expenses: 80000, budget: 250000 },
      { label: "Feb", expenses: 95000, budget: 190000 },
      { label: "Mar", expenses: 120000, budget: 180000 }
    ],
    error: null,
    statusCode: 200
  }
  // return useQuery({
  //   queryKey: ["expense-line-chart", organizationId],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get<ApiResponse<ExpenseLineChart>>(
  //       `/v1/org/${organizationId}/expenses/line-chart`
  //     )
  //     return data.data
  //   },
  //   enabled: !!organizationId,
  //   refetchOnWindowFocus: false
  // })
}

const useExpensePieChart = (_organizationId: string) => {
  return {
    success: true,
    message: "Expense breakdown retrieved successfully",
    data: [
      { label: "Transport", value: 45000 },
      { label: "Meals", value: 30000 },
      { label: "Office", value: 25000 },
      { label: "Other", value: 20000 }
    ],
    error: null,
    statusCode: 200
  }
  // return useQuery({
  //   queryKey: ["expense-pie-chart", organizationId],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get<ApiResponse<ExpensePieChart>>(
  //       `/v1/org/${organizationId}/expenses/pie-chart`
  //     )
  //     return data.data
  //   },
  //   enabled: !!organizationId,
  //   refetchOnWindowFocus: false
  // })
}

export {
  useCreateExpense,
  useListExpenses,
  useApproveExpense,
  useRejectExpense,
  useExpenseStats,
  useExpenseLineChart,
  useExpensePieChart
}
