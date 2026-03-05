import * as z from "zod"
import { createExpenseSchema, rejectExpenseSchema } from "./expense.schema"

type CreateExpenseData = z.input<typeof createExpenseSchema>
type RejectExpenseData = z.input<typeof rejectExpenseSchema>

export type { CreateExpenseData, RejectExpenseData }
