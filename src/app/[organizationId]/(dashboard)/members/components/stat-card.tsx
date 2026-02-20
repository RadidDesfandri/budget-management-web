import { Card, CardContent, CardDescription, CardTitle } from "@/src/components/ui/card"
import { cn } from "@/src/lib/utils"
import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons"

interface StatCardProps {
  icon: IconType | LucideIcon
  label: string
  value: string | number
  colorScheme: "blue" | "purple" | "green" | "red" | "yellow"
}

const startColorClasses = {
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  green: "bg-green-50 text-green-600",
  red: "bg-red-50 text-red-600",
  yellow: "bg-yellow-50 text-yellow-600"
}

export function StatCard({ icon: Icon, label, value, colorScheme }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <div className={cn("rounded-md p-3", startColorClasses[colorScheme])}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="text-2xl font-bold">{value}</CardTitle>
        </div>
      </CardContent>
    </Card>
  )
}
