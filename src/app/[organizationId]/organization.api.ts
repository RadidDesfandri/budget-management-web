import axiosInstance from "@/src/lib/axios"
import { ApiResponse } from "@/src/types/api"
import { OrganizationResponse } from "@/src/types/organization"
import { AxiosError } from "axios"

const getOrganization = async (organizationId: string, token?: string) => {
  try {
    const { data } = await axiosInstance.get<ApiResponse<OrganizationResponse>>(
      `/v1/org/${organizationId}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }
    )

    return data
  } catch (error) {
    console.log("Error fetching organization:", error)
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
        error: error.response?.data?.message || "Failed to fetch organization data",
        data: null,
        statusCode: error.response.status
      }
    }

    return {
      success: false,
      error: "Failed to fetch organization data",
      data: null,
      statusCode: 500
    }
  }
}

export { getOrganization }
