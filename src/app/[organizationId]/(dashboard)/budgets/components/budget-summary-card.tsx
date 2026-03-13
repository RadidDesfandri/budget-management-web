import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/components/ui/tooltip"
import { formatRupiah } from "@/src/lib/utils"
import { BudgetProgressBar } from "./budget-progress-bar"

interface BudgetSummaryCardsProps {
  budget: number
  used: number
  remaining: number
  percentage: number
}

export function BudgetSummaryCards({
  budget,
  used,
  remaining,
  percentage
}: BudgetSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-md border border-blue-300 bg-blue-100/20 p-3">
        <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Total Budget
        </p>
        <Tooltip>
          <TooltipTrigger>
            <p className="max-w-[140px] truncate text-xl font-bold tracking-wide">
              {formatRupiah(budget)}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{formatRupiah(budget)}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="rounded-md border border-blue-300 bg-blue-100/20 p-3">
        <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Total Spent
        </p>
        <Tooltip>
          <TooltipTrigger>
            <p className="max-w-[140px] truncate text-xl font-bold tracking-wide">
              {formatRupiah(used)}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{formatRupiah(used)}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <BudgetProgressBar remaining={remaining} percentage={percentage} />
    </div>
  )
}
