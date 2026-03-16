import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { QueryParams } from "@/src/types/global"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CategoryInput, ResponseCategories } from "./category.type"

interface ParamsGetCategories extends QueryParams {
  organizationId: string
}

const useGetCategories = ({
  organizationId,
  page,
  page_size,
  search,
  sort_by,
  order_by
}: ParamsGetCategories) => {
  return useQuery({
    queryKey: ["categories", organizationId, page, page_size, search, sort_by, order_by],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String((page ?? 0) + 1),
        page_size: String(page_size),
        ...(search && { search }),
        ...(sort_by && { sort_by }),
        ...(order_by && { order_by })
      })

      const { data } = await axiosInstance.get<ApiResponse<ResponseCategories>>(
        `/v1/org/${organizationId}/category`,
        { params }
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

const useUpdateCategory = (organizationId: string, categoryId: number) => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, CategoryInput>({
    mutationFn: async (payload: CategoryInput) => {
      try {
        const { data } = await axiosInstance.put(
          `/v1/org/${organizationId}/category/update/${categoryId}`,
          payload
        )
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({
        queryKey: ["categories", organizationId]
      })
    },
    onError: (err) => {
      if (!err.fieldErrors) {
        toast.error(err.message)
      }
    }
  })
}

const useDeleteCategory = (organizationId: string) => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<null>, ApiError, number>({
    mutationFn: async (categoryId: number) => {
      try {
        const { data } = await axiosInstance.delete(
          `/v1/org/${organizationId}/category/delete/${categoryId}`
        )
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({
        queryKey: ["categories", organizationId]
      })
    },
    onError: (err) => {
      if (!err.fieldErrors) {
        toast.error(err.message)
      }
    }
  })
}

export { useAddCategory, useDeleteCategory, useGetCategories, useUpdateCategory }
