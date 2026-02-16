import {
  nullableStringSchema,
  requiredDateTimeSchema,
  requiredEmailSchema,
  requiredNumberSchema,
  requiredStringSchema
} from "@/src/lib/zod"
import * as z from "zod"

const registerSchema = z
  .object({
    email: requiredEmailSchema,
    name: requiredStringSchema.min(2).max(50),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(30, { message: "Password must be at most 30 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(30, { message: "Password must be at most 30 characters" }),
    terms: z.boolean().refine((value) => value, {
      message: "You must accept the terms and conditions."
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

const registerResponseSchema = z.object({
  id: requiredNumberSchema,
  name: nullableStringSchema,
  email: requiredEmailSchema,
  updated_at: requiredDateTimeSchema,
  created_at: requiredDateTimeSchema
})

export { registerSchema, registerResponseSchema }
