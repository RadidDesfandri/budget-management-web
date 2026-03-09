import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { ActionItem, DataTableRowActions } from "@/src/components/shared/data-table-row-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { formatRupiah, getInitialUsername } from "@/src/lib/utils"
import { ExpenseWithRelations } from "@/src/types/expense"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Edit, Eye, Trash } from "lucide-react"
import CategoryIcon from "../../categories/components/category-icon"
import { ExpenseStatusCell } from "./expense-status-cell"
import { ExpenseDetailDrawer } from "./expense-detail-drawer"
import { ExpenseDeleteDialog } from "./expense-delete-dialog"

export const expenseActions: ActionItem<ExpenseWithRelations>[] = [
  {
    label: "Detail",
    icon: <Eye className="h-4 w-4" />,
    render: (data, trigger) => <ExpenseDetailDrawer expense={data} trigger={trigger} />
  },
  {
    label: "Edit",
    icon: <Edit className="h-4 w-4" />,
    onClick: (data) => {
      window.location.href = `/${data.organization_id}/expense/edit/${data.id}`
    }
  },
  {
    label: "Delete",
    icon: <Trash className="h-4 w-4" />,
    variant: "destructive",
    separator: "before",
    render: (data, trigger) => <ExpenseDeleteDialog expense={data} trigger={trigger} />
  }
]

export const expenseColumns: ColumnDef<ExpenseWithRelations>[] = [
  {
    accessorKey: "expense_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expense Date" />,
    cell: ({ row }) => {
      const { expense_date } = row.original
      return <span>{format(expense_date, "MMM dd, yyyy")}</span>
    }
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const { category } = row.original
      return (
        <div className="flex items-center gap-3">
          <CategoryIcon
            icon={category.icon}
            iconColor={category.icon_color ?? "#fff"}
            backgroundColor={category.background_color ?? "#3b82f6"}
          />
          <p className="font-medium capitalize transition-all">{category.name}</p>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const { title } = row.original
      return <span>{title}</span>
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const { amount } = row.original
      return <span className="font-semibold">{formatRupiah(amount)}</span>
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return <ExpenseStatusCell expense={row.original} />
    }
  },
  {
    accessorKey: "user",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Submitted By" />,
    cell: ({ row }) => {
      const { user } = row.original
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.full_avatar_url ?? ""} />
            <AvatarFallback>{getInitialUsername(user.name ?? "")}</AvatarFallback>
          </Avatar>
          <span>{user.name ?? "Unknown"}</span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} actions={expenseActions} />,
    enableSorting: false
  }
]
