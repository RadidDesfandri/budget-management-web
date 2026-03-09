import { Category } from "../app/[organizationId]/(dashboard)/categories/category.type"
import { User } from "./user"

interface Expense {
  id: number
  title: string
  description: string
  amount: number
  expense_date: string
  status: ExpenseStatus
  receipt_url: string
  full_receipt_url: string

  approved_at: string | null
  rejected_at: string | null
  rejected_reason: string | null

  created_at: string
  updated_at: string
}

interface ExpenseWithRelations extends Expense {
  organization_id: number
  category: Omit<Category, "organization_id" | "created_at" | "updated_at">
  user: Pick<User, "id" | "name" | "avatar_url" | "full_avatar_url">
}

type ExpenseStatus = "pending" | "approved" | "rejected"

export type { Expense, ExpenseStatus, ExpenseWithRelations }
