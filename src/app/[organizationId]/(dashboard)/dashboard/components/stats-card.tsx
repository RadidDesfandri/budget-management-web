import { Card, CardContent, CardTitle } from "@/src/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/components/ui/tooltip"

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
            <Tooltip>
              <TooltipTrigger>
                <p className="max-w-56 truncate text-2xl font-bold md:max-w-24 lg:max-w-36">
                  {value}
                </p>
              </TooltipTrigger>
              <TooltipContent>{value}</TooltipContent>
            </Tooltip>
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
