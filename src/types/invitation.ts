import { Organization } from "./organization"
import { User } from "./user"

interface InvitationData {
  id: number
  email: string
  role: string
  token: string
  expires_at: string
  accepted_at: string | null
  rejected_at: string | null
  created_at: string
  updated_at: string
  organization_id: number
  invited_by: Pick<User, "id" | "name" | "full_avatar_url">
  organization: Omit<Organization, "pivot">
}

type InvitationStatus = "pending" | "accepted" | "rejected" | "expired" | "history"

export type { InvitationData, InvitationStatus }
