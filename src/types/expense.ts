import { Category } from "../app/[organizationId]/(dashboard)/categories/category.type"
import { User } from "./user"

interface Expense {
  id: number
  title: string
  description: string | null
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

type SelectedUser = Pick<User, "id" | "name" | "avatar_url" | "full_avatar_url">

interface ExpenseWithRelations extends Expense {
  organization_id: number
  category: Omit<Category, "organization_id" | "created_at" | "updated_at">
  user: SelectedUser
  approved_by: SelectedUser | null
  rejected_by: SelectedUser | null
}

type ExpenseStatus = "pending" | "approved" | "rejected"

type RecentExpense = Pick<Expense, "id" | "title" | "amount" | "expense_date">

export type { Expense, ExpenseStatus, ExpenseWithRelations, RecentExpense }
