import { requiredDateSchema, requiredStringSchema } from "@/src/lib/zod"
import * as z from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf"
]

const createExpenseSchema = z.object({
  title: requiredStringSchema,
  amount: z.number("Amount is required").min(1, "Amount is required"),
  description: requiredStringSchema,
  category_id: z.string().min(1, "Category is required"),
  expense_date: requiredDateSchema,
  receipt: z
    .instanceof(File, { message: "Receipt is required" })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `File size must be less than 3MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, .webp and .pdf formats are allowed."
    )
})

const rejectExpenseSchema = z.object({
  reason: z
    .string()
    .min(10, "Rejection reason must be at least 10 characters")
    .max(500, "Rejection reason must be at most 500 characters")
})

export { createExpenseSchema, rejectExpenseSchema }
