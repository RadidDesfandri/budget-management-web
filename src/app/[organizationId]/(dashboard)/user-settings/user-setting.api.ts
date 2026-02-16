import { useAuth } from "@/src/context/auth-context"
import axiosInstance from "@/src/lib/axios"
import { normalizeApiError } from "@/src/lib/utils"
import { ApiError, ApiResponse } from "@/src/types/api"
import { User } from "@/src/types/user"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChangePasswordData, EditProfileData } from "./user-setting.type"

const useEditUser = () => {
  const { refetchUser } = useAuth()

  return useMutation<ApiResponse<User>, ApiError, EditProfileData>({
    mutationFn: async (payload: EditProfileData) => {
      try {
        const { data } = await axiosInstance.put("/v1/edit-profile", payload)
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      refetchUser()
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

const useChangePassword = () => {
  return useMutation<
    ApiResponse<null>,
    ApiError,
    Omit<ChangePasswordData, "new_password_confirmation">
  >({
    mutationFn: async (payload: Omit<ChangePasswordData, "new_password_confirmation">) => {
      try {
        const { data } = await axiosInstance.post("/v1/change-password", payload)
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

const useDeleteUser = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axiosInstance.delete("/v1/delete-account")
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      router.push("/")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}

const useChangeAvatar = () => {
  const { refetchUser } = useAuth()

  return useMutation<ApiResponse<User>, ApiError, FormData>({
    mutationFn: async (formData: FormData) => {
      try {
        const { data } = await axiosInstance.put("/v1/change-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      refetchUser()
    },
    onError: (error) => {
      if (!error.fieldErrors) {
        toast.error(error.message)
      }
    }
  })
}

const useRemoveAvatar = () => {
  const { refetchUser } = useAuth()

  return useMutation<ApiResponse<User>, ApiError>({
    mutationFn: async () => {
      try {
        const { data } = await axiosInstance.delete("/v1/remove-avatar")
        return data
      } catch (error) {
        throw normalizeApiError(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      refetchUser()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}

export { useChangeAvatar, useChangePassword, useDeleteUser, useEditUser, useRemoveAvatar }
