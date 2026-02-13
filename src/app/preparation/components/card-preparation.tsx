import { Card, CardContent } from "@/src/components/ui/card"
import { cn } from "@/src/lib/utils"
import { IconType } from "react-icons"

interface CardPreparationProps {
  title: string
  description: string
  icon: IconType
  action: React.ReactNode
  variant: "primary" | "secondary"
}

function CardPreparation({
  title,
  description,
  action,
  icon: Icon,
  variant
}: CardPreparationProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-3">
        <div
          className={cn(
            "w-fit rounded-full p-3",
            variant === "primary"
              ? "bg-primary/20 text-primary"
              : "bg-neutral-800/20 text-neutral-800"
          )}
        >
          <Icon className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-muted-foreground h-10 text-center text-sm">{description}</p>
        {action}
      </CardContent>
    </Card>
  )
}

export default CardPreparation
