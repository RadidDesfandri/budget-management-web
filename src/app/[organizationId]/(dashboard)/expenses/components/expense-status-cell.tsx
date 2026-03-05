"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { PermissionGuard } from "@/src/components/shared/permission-guard"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/components/ui/tooltip"
import { cn } from "@/src/lib/utils"
import { Check, X } from "lucide-react"
import { RejectExpenseDialog } from "./reject-expense-dialog"
import { useApproveExpense, useRejectExpense } from "../expense.api"
import { ExpenseWithRelations } from "@/src/types/expense"
import { ExpenseStatus } from "@/src/types/expense"

const statusConfig: Record<ExpenseStatus, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100"
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100"
  }
}

interface ExpenseStatusCellProps {
  expense: ExpenseWithRelations
}

export function ExpenseStatusCell({ expense }: ExpenseStatusCellProps) {
  const params = useParams()
  const organizationId = params.organizationId as string

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)

  const { mutate: approveExpense, isPending: isApproving } = useApproveExpense(organizationId)
  const { mutate: rejectExpense, isPending: isRejecting } = useRejectExpense(organizationId)

  const config = statusConfig[expense.status]
  const isLoading = isApproving || isRejecting

  const handleApprove = () => {
    approveExpense(expense.id)
  }

  const handleReject = (reason: string) => {
    rejectExpense(
      { expenseId: expense.id, payload: { reason } },
      {
        onSuccess: () => {
          setRejectDialogOpen(false)
        }
      }
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={cn("font-medium capitalize", config.className)}>
        {config.label}
      </Badge>

      {expense.status === "pending" && (
        <PermissionGuard action={["expense:approve", "expense:reject"]}>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-green-600 hover:bg-green-50 hover:text-green-700"
                  onClick={handleApprove}
                  disabled={isLoading}
                >
                  <Check className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Approve</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => setRejectDialogOpen(true)}
                  disabled={isLoading}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reject</TooltipContent>
            </Tooltip>

            <RejectExpenseDialog
              open={rejectDialogOpen}
              onOpenChange={setRejectDialogOpen}
              expense={expense}
              onConfirm={handleReject}
              isLoading={isRejecting}
            />
          </div>
        </PermissionGuard>
      )}
    </div>
  )
}
