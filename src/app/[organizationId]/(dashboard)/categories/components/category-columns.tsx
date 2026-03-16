import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { ActionItem, DataTableRowActions } from "@/src/components/shared/data-table-row-actions"
import { Badge } from "@/src/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Eye, Trash } from "lucide-react"
import { CategoryWithExpenses } from "../category.type"
import { CategoryDeleteDialog } from "./category-delete-dialog"
import { CategoryDetailDrawer } from "./category-detail-drawer"
import { CategoryEditDialog } from "./category-edit-dialog"
import CategoryIcon from "./category-icon"
import { format } from "date-fns"

export const categoryActions: ActionItem<CategoryWithExpenses>[] = [
  {
    label: "Detail",
    icon: <Eye className="h-4 w-4" />,
    render: (data, trigger) => <CategoryDetailDrawer category={data} trigger={trigger} />
  },
  {
    label: "Edit",
    icon: <Edit className="h-4 w-4" />,
    render: (data, trigger) => <CategoryEditDialog category={data} trigger={trigger} />
  },
  {
    label: "Delete",
    icon: <Trash className="h-4 w-4" />,
    variant: "destructive",
    separator: "before",
    render: (data, trigger) => <CategoryDeleteDialog category={data} trigger={trigger} />
  }
]

export const categoryColumns: ColumnDef<CategoryWithExpenses>[] = [
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
          <p className="text-lg font-medium capitalize transition-all">{category.name}</p>
        </div>
      )
    },
    enableHiding: false
  },
  {
    accessorKey: "expenses_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Number of Expenses" />,
    cell: ({ row }) => {
      const { expenses_count } = row.original
      return <Badge className="bg-gray-200 text-black">{expenses_count}</Badge>
    },
    enableHiding: false
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Update" />,
    cell: ({ row }) => {
      const { created_at } = row.original

      return (
        <span className="text-muted-foreground">
          {format(new Date(created_at), "MMM dd, yyyy HH:mm")}
        </span>
      )
    },
    enableHiding: false
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} actions={categoryActions} />,
    enableHiding: false,
    enableSorting: false
  }
]
