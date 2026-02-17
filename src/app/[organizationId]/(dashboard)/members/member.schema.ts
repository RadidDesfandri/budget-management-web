import { requiredEmailSchema, requiredStringSchema } from "@/src/lib/zod"
import * as z from "zod"

const inviteMemberSchema = z.object({
  email: requiredEmailSchema,
  role: requiredStringSchema
})

export { inviteMemberSchema }
