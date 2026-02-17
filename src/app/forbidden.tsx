import { ErrorPage } from "@/src/components/shared/error-page"
import { ShieldAlert } from "lucide-react"

export default function Forbidden() {
  return (
    <ErrorPage
      statusCode={403}
      icon={ShieldAlert}
      title="Access denied"
      description="You don't have permission to access this resource. Contact your administrator if you believe this is a mistake."
      iconColor="text-amber-600"
      iconBgColor="bg-amber-50"
    />
  )
}
