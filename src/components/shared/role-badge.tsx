import { cn } from "@/src/lib/utils"
import { Badge } from "../ui/badge"
import { Role } from "@/src/types/member"

interface RoleBadgeProps {
  role: Role
}

export const roleColorClasses = {
  admin: "bg-blue-50 text-blue-600",
  member: "bg-neutral-100 text-neutral-600",
  finance: "bg-yellow-50 text-yellow-600",
  owner: "bg-red-50 text-red-600"
}

function RoleBadge({ role }: RoleBadgeProps) {
  return <Badge className={cn("capitalize", roleColorClasses[role])}>{role}</Badge>
}

export default RoleBadge
