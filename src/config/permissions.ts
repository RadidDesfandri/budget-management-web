import { Role } from "../types/member"

export type Permission =
  | "org:update" // Edit info organisasi
  | "org:delete" // Hapus organisasi
  | "member:invite" // Invite member baru
  | "member:remove" // Kick member
  | "budget:create" // Buat budget baru
  | "budget:edit" // Edit budget
  | "budget:approve" // Approve request budget
  | "budget:view" // Lihat budget

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    "org:update",
    "org:delete",
    "member:invite",
    "member:remove",
    "budget:create",
    "budget:edit",
    "budget:approve",
    "budget:view"
  ],
  admin: [
    "org:update",
    "member:invite",
    "budget:create",
    "budget:edit",
    "budget:approve",
    "budget:view"
  ],
  finance: ["budget:approve", "budget:view", "budget:create", "budget:edit"],
  member: ["budget:create", "budget:view"]
}
