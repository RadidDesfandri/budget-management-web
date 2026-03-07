import { cn, formatRupiah } from "@/src/lib/utils"
import {
  CircleCheck,
  ClipboardClock,
  Clock3,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet
} from "lucide-react"
import { useMemo } from "react"
import { useExpenseStats } from "../../expenses/expense.api"
import { StatCard } from "./stats-card"

const DashboardStatsList = ({
  organizationId,
  filter
}: {
  organizationId: string
  filter: string
}) => {
  const { data: statsData, isLoading } = useExpenseStats(organizationId, filter)

  const stats = useMemo(() => {
    const d = statsData
    if (!d) return []

    const isUp = d.total_expenses.trend === "up"

    return [
      {
        title: "TOTAL EXPENSES",
        value: formatRupiah(d.total_expenses.amount),
        icon: Wallet,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100",
        footer: (
          <p
            className={cn(
              "flex items-center gap-1 text-sm",
              isUp ? "text-green-500" : "text-red-500"
            )}
          >
            {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {isUp ? "+" : "-"}
            {d.total_expenses.percent_change}% vs last month
          </p>
        )
      },
      {
        title: "PENDING APPROVALS",
        value: d.pending_approvals.count,
        icon: ClipboardClock,
        iconColor: "text-amber-600",
        iconBg: "bg-amber-100",
        footer: (
          <p className="flex items-center gap-1 text-sm text-amber-500">
            <Clock3 className="h-4 w-4" /> Required attention
          </p>
        )
      },
      {
        title: "APPROVED EXPENSES",
        value: d.approved_expenses.count,
        icon: CircleCheck,
        iconColor: "text-green-600",
        iconBg: "bg-green-100",
        footer: <p className="text-muted-foreground text-sm">This month</p>
      },
      {
        title: "REMAINING BUDGET",
        value: formatRupiah(d.remaining_budget.amount),
        icon: PiggyBank,
        iconColor: "text-purple-600",
        iconBg: "bg-purple-100",
        footer: (
          <p className="text-muted-foreground text-sm">
            of {formatRupiah(d.remaining_budget.allocated)} allocated
          </p>
        )
      }
    ]
  }, [statsData])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}

export default DashboardStatsList
