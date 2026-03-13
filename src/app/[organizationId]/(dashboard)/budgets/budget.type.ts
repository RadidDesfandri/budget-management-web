import { RecentExpense } from "@/src/types/expense"
import { PaginatedResponse } from "@/src/types/global"
import * as z from "zod"
import { Category } from "../categories/category.type"
import { addBudgetSchema } from "./budget.schema"

type AddBudgetInput = z.infer<typeof addBudgetSchema>

interface Budget {
  id: number
  budget: number
  used: number
  remaining: number
  month: string
  updated_at: string
}

interface BudgetData extends Budget {
  category: Omit<Category, "organization_id" | "created_at" | "updated_at">
  expenses: RecentExpense[]
  created_by: string
}

interface BudgetResponse {
  budgets: PaginatedResponse<BudgetData>
  total_budget: number
  total_used: number
  total_remaining: number
  period: string
}

export type { AddBudgetInput, Budget, BudgetData, BudgetResponse }
