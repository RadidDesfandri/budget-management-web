import { User } from "@/src/types/user"

type ActivityLogActionType =
  | "expense_created"
  | "expense_updated"
  | "expense_deleted"
  | "expense_approved"
  | "expense_rejected"
  | "budget_created"
  | "budget_updated"
  | "budget_deleted"
  | "member_invited"
  | "member_removed"
  | "member_role_updated"
  | "invitation_accepted"
  | "invitation_rejected"
  | "category_created"
  | "category_updated"
  | "category_deleted"
  | "organization_updated"
  | "user_login"
  | "user_logout"

interface ActivityLog {
  id: number
  user: Pick<User, "id" | "name" | "email" | "full_avatar_url">
  action_type: ActivityLogActionType
  description: string
  metadata: Record<string, unknown> | null
  ip_address: string | null
  created_at: string
}

interface ActivityLogsFilters {
  user_id?: string
  action_type?: ActivityLogActionType
  date_from?: string
  date_to?: string
}

export type { ActivityLog, ActivityLogActionType, ActivityLogsFilters }
