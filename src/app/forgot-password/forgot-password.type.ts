import * as z from "zod"
import { forgotPasswordSchema } from "./forgot-password.schema"

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export type { ForgotPasswordData }
