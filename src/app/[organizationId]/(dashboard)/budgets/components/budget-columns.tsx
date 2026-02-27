import { DataTableColumnHeader } from "@/src/components/shared/data-table-column-header"
import { formatRupiah } from "@/src/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import CategoryIcon from "../../categories/components/category-icon"
import { BudgetData } from "../budget.type"
import { DataTableRowActions } from "@/src/components/shared/data-table-row-actions"

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

      const getStatus = (pct: number) => {
        if (pct <= 75) return { label: "On Track", color: "bg-emerald-500" }
        if (pct <= 90) return { label: "Near Limit", color: "bg-amber-400" }
        return { label: "Over Budget", color: "bg-red-500" }
      }

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
