import * as z from "zod"
import { createExpenseSchema, rejectExpenseSchema } from "./expense.schema"

type CreateExpenseData = z.input<typeof createExpenseSchema>
type RejectExpenseData = z.input<typeof rejectExpenseSchema>

interface ExpensePieChart {
  label: string
  value: number
}

interface ExpenseStats {
  total_expenses: {
    amount: number
    trend: "up" | "down"
    percent_change: number
  }
  pending_approvals: {
    count: number
  }
  approved_expenses: {
    count: number
  }
  remaining_budget: {
    amount: number
    allocated: number
  }
}

export type { CreateExpenseData, RejectExpenseData, ExpensePieChart, ExpenseStats }
