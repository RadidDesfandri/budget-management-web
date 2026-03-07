import { ColumnDef } from "@tanstack/react-table"
import { ExpenseWithRelations } from "@/src/types/expense"
import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { format } from "date-fns"
import { formatRupiah } from "@/src/lib/utils"
import { ExpenseStatusCell } from "../../expenses/components/expense-status-cell"

export const recentExpenseColumn: ColumnDef<ExpenseWithRelations>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created Date" />,
    cell: ({ row }) => {
      const { created_at } = row.original
      return <span>{format(created_at, "MMM dd, yyyy")}</span>
    },
    enableSorting: false
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const { title } = row.original
      return <span>{title}</span>
    },
    enableSorting: false
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const { category } = row.original
      return <span>{category?.name}</span>
    },
    enableSorting: false
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const { amount } = row.original
      return <span>{formatRupiah(amount)}</span>
    },
    enableSorting: false
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return <ExpenseStatusCell expense={row.original} />
    },
    enableSorting: false
  }
]
