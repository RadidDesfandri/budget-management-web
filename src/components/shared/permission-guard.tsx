"use client"

import { Permission } from "@/src/config/permissions"
import { usePermission } from "@/src/hooks/use-permission"

interface PermissionGuardProps {
  action: Permission | Permission[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({ action, children, fallback = null }: PermissionGuardProps) {
  const { can } = usePermission()

  if (Array.isArray(action)) {
    if (!action.some((p) => can(p))) {
      return <>{fallback}</>
    }
  } else {
    if (!can(action)) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}
