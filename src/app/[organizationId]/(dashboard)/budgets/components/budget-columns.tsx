import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { formatRupiah } from "@/src/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import CategoryIcon from "../../categories/components/category-icon"
import { BudgetData } from "../budget.type"
import { ActionItem, DataTableRowActions } from "@/src/components/shared/data-table-row-actions"
import { Edit, Eye, Trash } from "lucide-react"
import DeleteBudgetDialog from "./delete-budget-dialog"
import { usePermission } from "@/src/hooks/use-permission"
import EditBudget from "./edit-budget"
import DetailBudget from "./detail-budget"
import { RecentExpense } from "@/src/types/expense"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/components/ui/tooltip"
import { getStatus } from "./budget-status-badge"

export const budgetActions: ActionItem<BudgetData>[] = [
  {
    label: "Detail",
    icon: <Eye className="h-4 w-4" />,
    render: (data, trigger) => <DetailBudget budget={data} trigger={trigger} />
  },
  {
    label: "Edit",
    icon: <Edit className="h-4 w-4" />,
    render: (data, trigger) => <EditBudget budget={data} trigger={trigger} />,
    hidden() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { can } = usePermission()
      return !can("budget:edit")
    }
  },
  {
    label: "Delete",
    icon: <Trash className="h-4 w-4" />,
    variant: "destructive",
    separator: "before",
    render: (data, trigger) => <DeleteBudgetDialog budget={data} trigger={trigger} />,
    hidden() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { can } = usePermission()
      return !can("budget:delete")
    }
  }
]

export const budgetColumns: ColumnDef<BudgetData>[] = [
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
    accessorKey: "budget",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Budget" />,
    cell: ({ row }) => {
      const { budget } = row.original
      return <span>{formatRupiah(budget)}</span>
    }
  },
  {
    accessorKey: "used",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Used" />,
    cell: ({ row }) => {
      const { used } = row.original
      return <span>{formatRupiah(used)}</span>
    }
  },
  {
    accessorKey: "remaining",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Remaining" />,
    cell: ({ row }) => {
      const { remaining } = row.original
      return <span>{formatRupiah(remaining)}</span>
    }
  },
  {
    accessorKey: "progress",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Progress" />,
    cell: ({ row }) => {
      const { budget, used } = row.original
      const budgetNum = parseFloat(String(budget))
      const percentage = budgetNum > 0 ? Math.min((used / budgetNum) * 100, 100) : 0
      const rounded = Math.round(percentage)

      const { color } = getStatus(rounded)

      return (
        <div className="flex min-w-[140px] flex-col gap-1">
          <span className="text-xs font-medium text-neutral-500">{rounded}%</span>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className={`h-full rounded-full transition-all ${color}`}
              style={{ width: `${rounded}%` }}
            />
          </div>
        </div>
      )
    },
    enableSorting: false
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} actions={budgetActions} />,
    enableSorting: false
  }
]

export const recentExpenseBudgets: ColumnDef<RecentExpense>[] = [
  {
    accessorKey: "expense_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const { expense_date } = row.original
      return <span className="text-sm">{format(expense_date, "MMM dd")}</span>
    },
    enableSorting: false
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const { title } = row.original
      return (
        <Tooltip>
          <TooltipTrigger>
            <p className="w-24 truncate text-sm">{title}</p>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-sm">{title}</span>
          </TooltipContent>
        </Tooltip>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const { amount } = row.original
      return <span className="text-sm">{formatRupiah(amount)}</span>
    },
    enableSorting: false
  }
]
