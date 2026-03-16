import * as z from "zod"
import { categorySchema } from "./category.schema"
import { PaginatedResponse } from "@/src/types/global"
import { Expense } from "@/src/types/expense"
import { User } from "@/src/types/user"

interface Category {
  id: number
  organization_id: number
  name: string
  icon: string
  icon_color: string | null
  expenses_count: number
  background_color: string | null
  created_by: Pick<User, "id" | "name"> | null
  created_at: string
  updated_at: string
}

type CategoryInput = z.infer<typeof categorySchema>

interface CategoryWithExpenses extends Category {
  recent_expenses: Pick<Expense, "id" | "title" | "amount" | "expense_date">[]
}

interface MostActiveCategory {
  id: number
  name: string
  expenses_count: number
}

interface ResponseCategories {
  most_active_category: MostActiveCategory
  categories: PaginatedResponse<CategoryWithExpenses>
}

export type { Category, CategoryInput, ResponseCategories, CategoryWithExpenses }
