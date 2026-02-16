import { FileQuestion } from "lucide-react"
import { ErrorPage } from "../components/shared/error-page"

export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      icon={FileQuestion}
    />
  )
}
