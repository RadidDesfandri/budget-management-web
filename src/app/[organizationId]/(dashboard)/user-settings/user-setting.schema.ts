import { requiredStringSchema } from "@/src/lib/zod"
import * as z from "zod"

const editProfileSchema = z.object({
  name: requiredStringSchema
})

const requirePasswordSchema = z.string().min(6, "Password must be at least 6 characters long")

const changePasswordSchema = z
  .object({
    current_password: requirePasswordSchema,
    new_password: requirePasswordSchema,
    new_password_confirmation: requirePasswordSchema
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New password and confirmation do not match",
    path: ["new_password_confirmation"]
  })

export { editProfileSchema, changePasswordSchema }
