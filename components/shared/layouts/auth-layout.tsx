import { cn } from "@/lib/utils"

type AuthLayoutProps = {
  left?: React.ReactNode
  right: React.ReactNode
  variant?: "primary" | "secondary"
  formPosition?: "left" | "right"
}

function AuthLayout({ left, right, variant = "primary", formPosition = "right" }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div
        className={cn(
          "p-9",
          variant === "primary" ? "bg-primary" : "bg-blue-50",
          formPosition === "right" ? "hidden md:flex" : "flex items-center justify-center"
        )}
      >
        {left}
      </div>

      <div
        className={cn(
          "items-center justify-center p-9",
          variant === "primary" ? "bg-gray-50" : "bg-white",
          formPosition === "right" ? "flex" : "hidden md:flex"
        )}
      >
        <div className="w-full max-w-md">{right}</div>
      </div>
    </div>
  )
}

export default AuthLayout
