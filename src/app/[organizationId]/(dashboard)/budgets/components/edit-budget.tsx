"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/src/components/ui/dialog"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useEditBudget } from "../budget.api"
import { AddBudgetInput, BudgetData } from "../budget.type"
import BudgetForm from "./budget-form"

interface EditBudgetProps {
  budget: BudgetData
  trigger: React.ReactNode
}

function EditBudget({ budget, trigger }: EditBudgetProps) {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { mutate, isPending, error } = useEditBudget(organizationId, budget.id)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onSubmit = (values: AddBudgetInput) => {
    mutate(values, {
      onSuccess: () => {
        setIsOpen(false)
      }
    })
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const [year, month] = budget.month.split("-")

  const defaultValues = {
    amount: Number(budget.budget),
    category_id: String(budget.category.id),
    month: {
      year: Number(year),
      month: Number(month) - 1
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <BudgetForm
          isPending={isPending}
          mode="edit"
          organizationId={organizationId}
          onSubmit={onSubmit}
          fieldErrors={error?.fieldErrors}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditBudget
