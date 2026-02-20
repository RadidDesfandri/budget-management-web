import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import RoleBadge from "@/src/components/shared/role-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { cn, getInitialUsername } from "@/src/lib/utils"
import { InvitationData } from "@/src/types/invitation"
import { Role } from "@/src/types/member"
import { Organization } from "@/src/types/organization"
import { ColumnDef } from "@tanstack/react-table"
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react"

export const invitationHistoryColumns: ColumnDef<InvitationData>[] = [
  {
    accessorKey: "organization",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Organization" />,
    cell: ({ row }) => {
      const organization = row.getValue("organization") as Omit<Organization, "pivot">

      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-md">
            <AvatarImage src={organization.full_logo_url || undefined} alt={organization.name} />
            <AvatarFallback className="rounded-md">
              {getInitialUsername(organization.name)}
            </AvatarFallback>
          </Avatar>
          <p>{organization.name}</p>
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const role = row.getValue("role") as Role

      return <RoleBadge role={role} />
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
    cell: ({ row }) => {
      const { accepted_at, rejected_at, expires_at } = row.original
      const baseStyle = "flex items-center gap-1.5 font-medium"

      if (accepted_at) {
        return (
          <div className={cn(baseStyle, "text-green-600")}>
            <CheckCircle2 className="h-4 w-4" />
            <span>Accepted</span>
          </div>
        )
      }

      if (rejected_at) {
        return (
          <div className={cn(baseStyle, "text-red-600")}>
            <XCircle className="h-4 w-4" />
            <span>Rejected</span>
          </div>
        )
      }

      const isExpired = new Date(expires_at).getTime() < new Date().getTime()

      if (isExpired) {
        return (
          <div className={cn(baseStyle, "text-yellow-600")}>
            <AlertCircle className="h-4 w-4" />
            <span>Expired</span>
          </div>
        )
      }

      return (
        <div className={cn(baseStyle, "text-yellow-600")}>
          <Clock className="h-4 w-4" />
          <span>Pending</span>
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const updatedAt = row.getValue("updated_at")

      return (
        <div className="text-muted-foreground">
          {new Date(String(updatedAt)).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false
  }
]
