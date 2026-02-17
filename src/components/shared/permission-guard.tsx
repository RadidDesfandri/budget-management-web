"use client"

import { Permission } from "@/src/config/permissions"
import { usePermission } from "@/src/hooks/use-permission"

interface PermissionGuardProps {
  action: Permission
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({ action, children, fallback = null }: PermissionGuardProps) {
  const { can } = usePermission()

  if (!can(action)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
