import * as z from "zod"
import { addBudgetSchema } from "./budget.schema"

type AddBudgetInput = z.infer<typeof addBudgetSchema>

export type { AddBudgetInput }
