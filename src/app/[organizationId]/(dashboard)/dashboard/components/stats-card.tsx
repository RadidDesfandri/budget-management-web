import { Card, CardContent, CardTitle } from "@/src/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor: string
  iconBg: string
  footer?: React.ReactNode
}

export function StatCard({ title, value, icon: Icon, iconColor, iconBg, footer }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-muted-foreground text-sm">{title}</CardTitle>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={cn("h-fit rounded-full p-3", iconBg, iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        {footer}
      </CardContent>
    </Card>
  )
}
