import { formatRupiah } from "@/src/lib/utils"
import { BudgetStatusBadge, getStatus } from "./budget-status-badge"

interface BudgetProgressBarProps {
  remaining: number
  percentage: number
}

export function BudgetProgressBar({ remaining, percentage }: BudgetProgressBarProps) {
  const { color } = getStatus(percentage)

  return (
    <div className="space-y-1.5 rounded-md border border-blue-300 bg-blue-100/20 p-3 md:col-span-2">
      <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Remaining Budget
      </p>
      <div className="flex justify-between">
        <p className="text-xl font-bold tracking-wide">{formatRupiah(remaining)}</p>
        <BudgetStatusBadge percentage={percentage} />
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-300">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="flex justify-end text-xs text-neutral-500">{percentage}% Utilization</span>
    </div>
  )
}
