import { Card, CardContent } from "@/src/components/ui/card"
import { formatRupiah } from "@/src/lib/utils"
import { Landmark, Percent, ShoppingCart } from "lucide-react"

interface BudgetStatsProps {
  totalBudget: number
  totalUsed: number
  totalRemaining: number
  isLoading?: boolean
}

function BudgetStats({ totalBudget, totalUsed, totalRemaining, isLoading }: BudgetStatsProps) {
  const utilization = totalBudget > 0 ? ((totalUsed / totalBudget) * 100).toFixed(1) : "0.0"

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Total Budget Set",
          icon: Landmark,
          iconClass: "bg-blue-50 text-blue-800",
          value: formatRupiah(totalBudget),
          description: <p className="text-muted-foreground text-sm">Fixed allocation</p>
        },
        {
          title: "Total Spent",
          icon: ShoppingCart,
          iconClass: "bg-amber-50 text-amber-800",
          value: formatRupiah(totalUsed),
          description: (
            <p className="text-muted-foreground text-sm">
              Remaining: {formatRupiah(totalRemaining)}
            </p>
          )
        },
        {
          title: "Overall Utilization",
          icon: Percent,
          iconClass: "bg-green-50 text-green-800",
          value: `${utilization}%`,
          description: (
            <p className="text-muted-foreground flex items-center gap-1 text-sm">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${Number(utilization) > 90 ? "bg-red-500" : Number(utilization) > 70 ? "bg-amber-500" : "bg-green-500"}`}
              />
              <span>
                {Number(utilization) > 90
                  ? "Over budget risk"
                  : Number(utilization) > 70
                    ? "Monitor closely"
                    : "On track"}
              </span>
            </p>
          )
        }
      ].map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index}>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-neutral-500">{card.title}</p>
                <div className={`rounded px-1 py-2 ${card.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-bold">{isLoading ? "..." : card.value}</p>
              {card.description}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default BudgetStats
