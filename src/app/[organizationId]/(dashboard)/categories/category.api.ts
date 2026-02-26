import { ApiError, ApiResponse } from "@/src/types/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Category, CategoryInput } from "./category.type"
import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { toast } from "sonner"

const useGetCategories = (organizationId: string) => {
  return useQuery({
    queryKey: ["categories", organizationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<Category[]>>(
        `/v1/org/${organizationId}/category`
      )

      return data.data
    },
    refetchOnWindowFocus: false,
    enabled: !!organizationId
  })
}

const useAddCategory = (organizationId: string) => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, CategoryInput>({
    mutationFn: async (payload: CategoryInput) => {
      try {
        const { data } = await axiosInstance.post(
          `/v1/org/${organizationId}/category/create`,
          payload
        )
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories", organizationId]
      })

      toast.success(data.message)
    },
    onError: (err) => {
      if (!err.fieldErrors) {
        toast.error(err.message)
      }
    }
  })
}

export { useGetCategories, useAddCategory }
