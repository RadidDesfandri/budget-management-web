"use client"

import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { ActionItem, DataTableRowActions } from "@/src/components/shared/data-table-row-actions"
import RoleBadge from "@/src/components/shared/role-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Checkbox } from "@/src/components/ui/checkbox"
import { useAuth } from "@/src/context/auth-context"
import { usePermission } from "@/src/hooks/use-permission"
import { getInitialUsername } from "@/src/lib/utils"
import { MemberData, Role } from "@/src/types/member"
import { User } from "@/src/types/user"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Eye, Trash } from "lucide-react"
import DeleteMemberDialog from "./delete-member-dialog"
import EditMemberDialog from "./edit-member-dialog"
import MemberDetailDrawer from "./member-detail-drawer"
import { format } from "date-fns"

export const memberActions: ActionItem<MemberData>[] = [
  {
    label: "Detail",
    icon: <Eye className="h-4 w-4" />,
    render: (data, trigger) => <MemberDetailDrawer member={data} trigger={trigger} />
  },
  {
    label: "Edit",
    icon: <Edit className="h-4 w-4" />,
    render: (data, trigger) => <EditMemberDialog member={data} trigger={trigger} />,
    hidden(data) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { can } = usePermission()
      return !can("member:invite") || data.role === "owner"
    }
  },
  {
    label: "Delete",
    icon: <Trash className="h-4 w-4" />,
    variant: "destructive",
    separator: "before",
    render: (data, trigger) => <DeleteMemberDialog member={data} trigger={trigger} />,
    hidden(data) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { can } = usePermission()
      return !can("member:remove") || data.role === "owner"
    }
  }
]

export const memberColumns: ColumnDef<MemberData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "user",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const userData = row.getValue("user") as Pick<
        User,
        "id" | "name" | "email" | "full_avatar_url"
      >

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { user: currentUser } = useAuth()

      return (
        <div className="flex items-center space-x-4">
          <Avatar size="lg">
            <AvatarImage src={userData.full_avatar_url ?? ""} />
            <AvatarFallback>{getInitialUsername(userData.name ?? "B F")}</AvatarFallback>
          </Avatar>
          <div>
            <div>
              <span className="mr-3 max-w-125 truncate text-lg font-semibold">{userData.name}</span>
              {currentUser?.id === userData.id && (
                <span className="h-1 rounded bg-blue-50 px-2 text-xs font-semibold text-neutral-800">
                  YOU
                </span>
              )}
            </div>
            <div className="text-muted-foreground max-w-125 truncate">{userData.email}</div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const role = row.getValue("role") as Role

      return <RoleBadge role={role} />
    }
  },
  {
    accessorKey: "joined_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined At" />,
    cell: ({ row }) => {
      return (
        <span className="max-w-125 truncate">
          {format(new Date(row.getValue("joined_at")), "MMM dd, yyyy")}
        </span>
      )
    }
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} actions={memberActions} />,
    enableSorting: false
  }
]
