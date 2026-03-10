import { cookies } from "next/headers"
import EditExpense from "../../components/edit-expense-page"
import { getExpenseDetail } from "./expense.detail.api"
import { forbidden, notFound } from "next/navigation"
import { LockIcon } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"

async function EditExpensePage({
  params
}: {
  params: Promise<{ organizationId: string; expenseId: string }>
}) {
  const { organizationId, expenseId } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  const { statusCode, data } = await getExpenseDetail({
    organizationId,
    expenseId: Number(expenseId),
    token
  })

  if (statusCode === 404) notFound()

  if (statusCode === 403) forbidden()

  if (statusCode === 408 || statusCode === 503) {
    throw new Error("SERVICE_UNAVAILABLE")
  }

  if (statusCode >= 500) {
    throw new Error("INTERNAL_SERVER_ERROR")
  }

  if (!data) notFound()

  if (data.status !== "pending") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="bg-muted rounded-full p-4">
          <LockIcon className="text-muted-foreground size-8" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Expense Cannot Be Edited</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Expense is already in <span className="font-medium capitalize">{data.status}</span>{" "}
            status and cannot be edited again.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/${organizationId}/expenses`}>Back to Expense List</Link>
        </Button>
      </div>
    )
  }

  return (
    <EditExpense expenseId={Number(expenseId)} organizationId={organizationId} expense={data} />
  )
}

export default EditExpensePage
