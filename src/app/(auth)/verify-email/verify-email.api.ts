import axiosInstance from "@/src/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { ApiResponse } from "@/src/types/api"

const useVerifyEmail = (id: string, hash: string, params: string) => {
  return useQuery({
    queryKey: ["verify-email", id, hash, params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<null>>(
        `/v1/email/verify/${id}/${hash}?${params}`
      )
      return data
    },
    retry: false
  })
}

export { useVerifyEmail }
