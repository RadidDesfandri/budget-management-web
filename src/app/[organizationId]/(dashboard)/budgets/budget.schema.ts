import * as z from "zod"

const addBudgetSchema = z.object({
  amount: z.number().min(1, "Budget amount is required"),
  category_id: z.string().min(1, "Category is required"),
  month: z.object({
    year: z.number(),
    month: z.number()
  })
})

export { addBudgetSchema }
