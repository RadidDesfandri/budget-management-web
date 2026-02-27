import * as z from "zod"
import { addBudgetSchema } from "./budget.schema"
import { PaginatedResponse } from "@/src/types/global"
import { Category } from "../categories/category.type"

type AddBudgetInput = z.infer<typeof addBudgetSchema>

interface Budget {
  id: number
  budget: number
  used: number
  remaining: number
}

interface BudgetData extends Budget {
  category: Omit<Category, "organization_id" | "created_at" | "updated_at">
}

interface BudgetResponse {
  budgets: PaginatedResponse<BudgetData>
  total_budget: number
  total_used: number
  total_remaining: number
  period: string
}

export type { AddBudgetInput, Budget, BudgetData, BudgetResponse }
