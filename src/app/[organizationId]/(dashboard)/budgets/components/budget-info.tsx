import { Separator } from "@/src/components/ui/separator"
import { format } from "date-fns"
import { ICON_MAP } from "../../categories/category.config"

interface BudgetInfoProps {
  month: string
  updatedAt: string
  createdBy: string
  category: {
    name: string
    icon: string
    icon_color: string | null
  }
}

export function BudgetInfo({ month, updatedAt, category, createdBy }: BudgetInfoProps) {
  const IconComponent = ICON_MAP[category.icon]

  return (
    <div>
      <p className="text-muted-foreground mb-1 text-sm font-bold tracking-wider uppercase">
        Information
      </p>
      <Separator />

      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-muted-foreground text-sm">Month</p>
          <p className="text-sm font-medium">{format(month, "MMMM yyyy")}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Category</p>
          <p className="flex items-center gap-1.5 text-sm font-medium">
            <IconComponent color={category.icon_color ?? "#fff"} className="h-3 w-3" />
            {category.name}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Created By</p>
          <p className="text-sm font-medium capitalize">{createdBy}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Last Updated</p>
          <p className="text-sm font-medium">{format(updatedAt, "MMM dd, yyyy")}</p>
        </div>
      </div>
    </div>
  )
}
