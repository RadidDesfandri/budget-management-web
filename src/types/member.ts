import { PaginatedResponse } from "./global"
import { User } from "./user"

interface Member {
  id: number
  role: Role
  joined_at: string
}

type Role = "admin" | "member" | "finance" | "owner"

interface MemberData extends Member {
  user: Pick<User, "id" | "name" | "email" | "full_avatar_url">
}

interface ResponseMembers {
  members: PaginatedResponse<MemberData>
  stats: {
    total_members: number
    total_admins: number
    pending_invites: number
  }
}

export type { Member, MemberData, ResponseMembers, Role }
