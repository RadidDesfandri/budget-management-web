"use client"

import { useParams } from "next/navigation"
import ExpenseForm from "../components/expense-form"
import { useCreateExpense } from "../expense.api"
import { CreateExpenseData } from "../expense.type"

function CreateExpense() {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { mutateAsync: createExpense, isPending, error } = useCreateExpense(organizationId)

  function onSubmit(values: CreateExpenseData) {
    createExpense(values)
  }

  return (
    <ExpenseForm
      organizationId={organizationId}
      mode="create"
      onSubmit={onSubmit}
      isPending={isPending}
      fieldErrors={error?.fieldErrors}
    />
  )
}

export default CreateExpense
