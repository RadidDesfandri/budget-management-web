import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { DataTableRowActions } from "@/src/components/shared/data-table-row-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { formatRupiah, getInitialUsername } from "@/src/lib/utils"
import { ExpenseWithRelations } from "@/src/types/expense"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import CategoryIcon from "../../categories/components/category-icon"
import { ExpenseStatusCell } from "./expense-status-cell"

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
    enableSorting: false
  }
]
