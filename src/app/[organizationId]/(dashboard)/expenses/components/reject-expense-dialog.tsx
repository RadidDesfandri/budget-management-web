"use client"

import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/src/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { AlertTriangle, CalendarDays, Receipt, Tag } from "lucide-react"
import { format } from "date-fns"
import { cn, formatRupiah } from "@/src/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { rejectExpenseSchema } from "../expense.schema"
import { RejectExpenseData } from "../expense.type"
import { ExpenseWithRelations } from "@/src/types/expense"

interface RejectExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense: ExpenseWithRelations | null
  onConfirm: (reason: string) => void
  isLoading?: boolean
}

const QUICK_SUGGESTIONS = [
  "Receipt is missing",
  "Amount exceeds budget",
  "Wrong category",
  "Duplicate submission",
  "Insufficient description"
]

export function RejectExpenseDialog({
  open,
  onOpenChange,
  expense,
  onConfirm,
  isLoading = false
}: RejectExpenseDialogProps) {
  const form = useForm<RejectExpenseData>({
    resolver: zodResolver(rejectExpenseSchema),
    defaultValues: {
      reason: ""
    }
  })

  const reason = form.watch("reason")

  const onSubmit = (values: RejectExpenseData) => {
    onConfirm(values.reason)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (isLoading) return
    onOpenChange(nextOpen)
    if (!nextOpen) {
      form.reset()
    }
  }

  if (!expense) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[460px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <div className="mb-1 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <DialogTitle className="text-base">Reject Expense</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground text-sm">
                Please provide a reason so the submitter knows what to fix or resubmit.
              </DialogDescription>
            </DialogHeader>

            {/* Expense Summary */}
            <div className="bg-muted/40 mt-4 space-y-2 rounded-lg border px-4 py-3 text-sm">
              <p className="text-foreground truncate font-semibold">{expense.title}</p>
              <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                <span className="flex items-center gap-1.5">
                  <Receipt className="h-3.5 w-3.5" />
                  {formatRupiah(Number(expense.amount))}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {format(new Date(expense.expense_date), "MMM dd, yyyy")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 capitalize" />
                  {expense.category.name}
                </span>
              </div>
            </div>

            {/* Reason Input */}
            <div className="my-4 space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>
                        Rejection Reason <span className="text-red-500">*</span>
                      </FormLabel>
                      <span
                        className={cn(
                          "text-xs tabular-nums",
                          reason.length < 10 ? "text-muted-foreground" : "text-green-600"
                        )}
                      >
                        {reason.length} / 500
                      </span>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Receipt is missing, amount exceeds budget limit, incorrect category..."
                        className="min-h-[100px] resize-none text-sm"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quick Reason Suggestions */}
              <div className="space-y-1.5">
                <p className="text-muted-foreground text-xs">Quick suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SUGGESTIONS.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="hover:bg-accent cursor-pointer text-xs font-normal transition-colors"
                      onClick={() => {
                        form.setValue("reason", suggestion, { shouldValidate: true })
                      }}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Rejecting..." : "Reject Expense"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
