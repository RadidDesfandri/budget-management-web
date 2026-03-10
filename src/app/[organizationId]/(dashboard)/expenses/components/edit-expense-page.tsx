"use client"

import { ExpenseWithRelations } from "@/src/types/expense"
import { useEditExpense } from "../expense.api"
import { CreateExpenseData } from "../expense.type"
import ExpenseForm from "./expense-form"

function EditExpense({
  expense,
  expenseId,
  organizationId
}: {
  expense: ExpenseWithRelations | null
  expenseId: number
  organizationId: string
}) {
  const {
    mutateAsync: editExpense,
    isPending: isEditing,
    error
  } = useEditExpense(organizationId, Number(expenseId))

  const onSubmit = async (data: CreateExpenseData) => {
    await editExpense(data)
  }

  return (
    <ExpenseForm
      organizationId={organizationId}
      mode="edit"
      defaultValues={{
        title: expense?.title,
        amount: Number(expense?.amount),
        description: expense?.description,
        category_id: String(expense?.category.id),
        expense_date: expense?.expense_date.split("T")[0],
        receipt_url: expense?.full_receipt_url
      }}
      onSubmit={onSubmit}
      isPending={isEditing}
      fieldErrors={error?.fieldErrors}
    />
  )
}

export default EditExpense
