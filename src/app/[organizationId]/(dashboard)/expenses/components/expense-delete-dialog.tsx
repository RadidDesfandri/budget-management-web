"use client"

import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { ExpenseWithRelations } from "@/src/types/expense"
import { useDeleteExpense } from "../expense.api"

interface ExpenseDeleteDialogProps {
  expense: ExpenseWithRelations
  trigger: React.ReactNode
}

export function ExpenseDeleteDialog({ expense, trigger }: ExpenseDeleteDialogProps) {
  const { mutate: deleteExpense, isPending } = useDeleteExpense(String(expense.organization_id))

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => deleteExpense(expense.id)}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
