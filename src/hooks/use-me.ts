import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../lib/axios"
import { ApiResponse } from "../types/api"
import { User } from "../types/user"

const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<User>>("/v1/me")
      return data
    },
    refetchOnWindowFocus: false
  })
}

export { useMe }
