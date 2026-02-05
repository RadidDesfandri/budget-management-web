import { requiredEmailSchema, requiredStringSchema } from "@/src/lib/zod"
import * as z from "zod"

const loginSchema = z.object({
  email: requiredEmailSchema,
  password: z.string().min(6, "Password must be at least 6 characters long")
})

const loginResponseSchema = z.object({
  token: requiredStringSchema
})

export { loginSchema, loginResponseSchema }
