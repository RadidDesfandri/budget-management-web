import * as z from "zod"
import {
  nullableStringSchema,
  requiredDateTimeSchema,
  requiredNumberSchema,
  requiredStringSchema
} from "../lib/zod"

const organizationUserSchema = z.object({
  user_id: requiredNumberSchema,
  organization_id: requiredNumberSchema,
  role: requiredStringSchema,
  created_at: requiredDateTimeSchema,
  updated_at: requiredDateTimeSchema
})

const organizationSchema = z.object({
  id: requiredNumberSchema,
  name: requiredStringSchema,
  full_logo_url: nullableStringSchema,
  pivot: organizationUserSchema
})

export { organizationSchema, organizationUserSchema }
