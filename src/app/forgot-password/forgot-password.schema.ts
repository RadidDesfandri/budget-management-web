import { requiredEmailSchema } from "@/src/lib/zod"
import * as z from "zod"

const forgotPasswordSchema = z.object({
  email: requiredEmailSchema
})

export { forgotPasswordSchema }
