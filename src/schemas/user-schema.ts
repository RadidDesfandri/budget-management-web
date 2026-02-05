import * as z from "zod"
import {
  nullableStringSchema,
  requiredDateTimeSchema,
  requiredEmailSchema,
  requiredNumberSchema
} from "../lib/zod"

const userSchema = z.object({
  id: requiredNumberSchema,
  name: nullableStringSchema,
  email: requiredEmailSchema,
  avatar_url: nullableStringSchema,
  email_verified_at: requiredDateTimeSchema,
  updated_at: requiredDateTimeSchema,
  created_at: requiredDateTimeSchema
})

export { userSchema }
