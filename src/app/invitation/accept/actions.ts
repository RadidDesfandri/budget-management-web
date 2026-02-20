import axiosInstance from "@/src/lib/axios"
import { ApiResponse } from "@/src/types/api"
import { InvitationData } from "@/src/types/invitation"
import { AxiosError } from "axios"

const verifyTokenInvitation = async (token: string) => {
  try {
    const { data } = await axiosInstance.get<ApiResponse<InvitationData>>(
      `/v1/org/invitation/verify?token=${token}`
    )

    return data
  } catch (error) {
    console.error(error, "Failed to fetch verify token invitation")
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message as string | undefined,
        data: null,
        statusCode: error.response?.status || 500
      }
    }

    return {
      success: false,
      error: undefined,
      data: null,
      statusCode: 500
    }
  }
}

export { verifyTokenInvitation }
