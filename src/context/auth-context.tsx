"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect } from "react"
import { publicRoutes } from "../constanta/app"
import { authToken } from "../lib/auth-token"
import axiosInstance from "../lib/axios"
import { ApiResponse } from "../types/api"
import { Organization } from "../types/organization"
import { User } from "../types/user"

interface UserWithOrganization extends User {
  organizations: Organization[]
}

interface AuthContextType {
  user: UserWithOrganization | null
  isLoading: boolean
  isAuthenticated: boolean
  hasOrganization: boolean
  refetchUser: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const {
    data: userData,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<UserWithOrganization>>("/v1/me")
      return data
    },
    enabled: !!authToken.get(), // hanya fetch jika ada token
    refetchOnWindowFocus: false,
    retry: false
  })

  const logout = () => {
    queryClient.setQueryData(["me"], null)
    queryClient.removeQueries({ queryKey: ["me"] })
    queryClient.clear()
  }

  const user = userData?.data ?? null
  const isAuthenticated = !!user
  const hasOrganization = (user?.organizations?.length ?? 0) > 0

  const isPublicRoute = publicRoutes.includes(pathname)

  const shouldRedirect =
    !isLoading &&
    ((!user && !isPublicRoute) ||
      (user && isPublicRoute) ||
      (user && !hasOrganization && pathname !== "/preparation") ||
      (user && hasOrganization && pathname === "/preparation"))

  useEffect(() => {
    if (isLoading) return

    if (!user && !isPublicRoute) {
      router.push("/login")
      return
    }

    if (user) {
      if (isPublicRoute) {
        if (hasOrganization) {
          router.push("/dashboard")
        } else {
          router.push("/preparation")
        }
        return
      }

      if (!hasOrganization && pathname !== "/preparation") {
        router.push("/preparation")
        return
      }

      if (hasOrganization && pathname === "/preparation") {
        router.push("/dashboard")
        return
      }
    }
  }, [user, isLoading, pathname, hasOrganization, isPublicRoute, router])

  if (isLoading || shouldRedirect) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        hasOrganization,
        refetchUser: refetch,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
