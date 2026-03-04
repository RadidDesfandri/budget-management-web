import * as z from "zod"
import { createExpenseSchema } from "./expense.schema"

type CreateExpenseData = z.input<typeof createExpenseSchema>
export type { CreateExpenseData }
