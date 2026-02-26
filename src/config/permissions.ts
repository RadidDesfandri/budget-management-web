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
    "category:delete"
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
    "category:delete"
  ],
  finance: [
    "budget:approve",
    "budget:view",
    "budget:create",
    "budget:edit",
    "category:create",
    "category:edit",
    "category:delete"
  ],
  member: ["budget:create", "budget:view", "category:view"]
}
