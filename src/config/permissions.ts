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
  | "category:create" // Buat kategori baru
  | "category:edit" // Edit kategori
  | "category:delete" // Hapus kategori
  | "category:view" // Lihat kategori
  | "expense:approve" // Approve request expense
  | "expense:reject" // Reject request expense

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    "org:update",
    "org:delete",
    "member:invite",
    "member:remove",
    "budget:create",
    "budget:edit",
    "budget:approve",
    "budget:view",
    "category:create",
    "category:edit",
    "category:delete",
    "expense:approve",
    "expense:reject"
  ],
  admin: [
    "org:update",
    "member:invite",
    "budget:create",
    "budget:edit",
    "budget:approve",
    "budget:view",
    "category:create",
    "category:edit",
    "category:delete",
    "expense:approve",
    "expense:reject"
  ],
  finance: [
    "budget:approve",
    "budget:view",
    "budget:create",
    "budget:edit",
    "category:create",
    "category:edit",
    "category:delete",
    "expense:approve",
    "expense:reject"
  ],
  member: ["budget:create", "budget:view", "category:view"]
}
