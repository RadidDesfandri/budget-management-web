import axiosInstance from "@/src/lib/axios"
import { ApiResponse } from "@/src/types/api"
import { ExpenseWithRelations } from "@/src/types/expense"
import { AxiosError } from "axios"

const getExpenseDetail = async ({
  organizationId,
  expenseId,
  token
}: {
  organizationId: string
  expenseId: number
  token?: string
}) => {
  try {
    const { data } = await axiosInstance.get<ApiResponse<ExpenseWithRelations>>(
      `/v1/org/${organizationId}/expenses/${expenseId}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }
    )

    return data
  } catch (error) {
    console.log("Error fetching expense:", error)
    if (error instanceof AxiosError) {
      if (!error.response) {
        return {
          success: false,
          error: error.message || "Network error or timeout",
          data: null,
          statusCode: error.code === "ETIMEDOUT" ? 408 : 503
        }
      }

      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch expense data",
        data: null,
        statusCode: error.response.status
      }
    }

    return {
      success: false,
      error: "Failed to fetch expense data",
      data: null,
      statusCode: 500
    }
  }
}

export { getExpenseDetail }
