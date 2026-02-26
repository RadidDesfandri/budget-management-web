import { ColumnDef } from "@tanstack/react-table"
import { Category } from "../category.type"
import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { DataTableRowActions } from "@/src/components/shared/data-table-row-actions"
import { Badge } from "@/src/components/ui/badge"
import CategoryIcon from "./category-icon"

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category Name" />,
    cell: ({ row }) => {
      const category = row.original
      return (
        <div className="flex items-center gap-3">
          <CategoryIcon
            icon={category.icon}
            iconColor={category.icon_color ?? "#fff"}
            backgroundColor={category.background_color ?? "#3b82f6"}
          />
          <div>
            <p className="text-lg font-medium capitalize transition-all">{category.name}</p>
            <p className="text-muted-foreground text-xs">0 Expense</p>
          </div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: "number-of-expenses",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Number of Expenses" />,
    cell: ({ row }) => <Badge className="bg-gray-200 text-black">0</Badge>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Update" />,
    cell: ({ row }) => {
      const updatedAt = row.getValue("updated_at")

      return (
        <div className="text-muted-foreground">
          {new Date(String(updatedAt)).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            minute: "2-digit",
            hour: "2-digit"
          })}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
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
      />
    ),
    enableHiding: false,
    enableSorting: false
  }
]
