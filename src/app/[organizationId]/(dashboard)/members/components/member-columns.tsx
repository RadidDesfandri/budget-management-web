"use client"

import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { DataTableRowActions } from "@/src/components/shared/data-table-row-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Checkbox } from "@/src/components/ui/checkbox"
import { useAuth } from "@/src/context/auth-context"
import { cn, getInitialUsername } from "@/src/lib/utils"
import { MemberData, Role } from "@/src/types/member"
import { User } from "@/src/types/user"
import { ColumnDef } from "@tanstack/react-table"

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

      const colorClasses = {
        admin: "bg-blue-50 text-blue-600",
        member: "bg-neutral-100 text-neutral-600",
        finance: "bg-yellow-50 text-yellow-600",
        owner: "bg-red-50 text-red-600"
      }

      return <Badge className={cn("capitalize", colorClasses[role])}>{role}</Badge>
    }
  },
  {
    accessorKey: "joined_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined At" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-125 truncate">
            {new Date(row.getValue("joined_at")).toLocaleDateString()}
          </span>
        </div>
      )
    }
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onEdit={(data) => {
          console.log("Edit:", data)
          // Implementasi edit logic
        }}
        onDelete={(data) => {
          console.log("Delete:", data)
          // Implementasi delete logic
        }}
        onCopy={(data) => {
          navigator.clipboard.writeText(data.id.toString())
          // Toast notification
        }}
      />
    ),
    enableHiding: false,
    enableSorting: false
  }
]
