import { cn } from "@/src/lib/utils"
import { RiWallet3Fill } from "react-icons/ri"

interface LogoProps {
  variant?: "primary" | "secondary"
}

function Logo({ variant = "primary" }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "rounded-md p-2 text-white",
          variant === "secondary" ? "bg-secondary/30 border border-white/30" : "bg-primary"
        )}
      >
        <RiWallet3Fill />
      </div>
      <p
        className={cn(
          "text-xl font-bold tracking-tight",
          variant === "secondary" ? "text-secondary" : "text-black"
        )}
      >
        BudgetFlow
      </p>
    </div>
  )
}

export default Logo
