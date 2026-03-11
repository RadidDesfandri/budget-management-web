"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { BudgetData } from "../budget.type"
import { useDeleteBudget } from "../budget.api"
import { useParams } from "next/navigation"

interface DeleteBudgetDialogProps {
  budget: BudgetData
  trigger: React.ReactNode
}

const DeleteBudgetDialog = ({ budget, trigger }: DeleteBudgetDialogProps) => {
  const params = useParams()
  const organizationId = params.organizationId as string
  const { mutate: deleteBudget, isPending } = useDeleteBudget(organizationId)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Budget</DialogTitle>
          <DialogDescription>Are you sure you want to delete this budget?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isPending} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() =>
              deleteBudget(budget.id, {
                onSuccess: () => setOpen(false)
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBudgetDialog
