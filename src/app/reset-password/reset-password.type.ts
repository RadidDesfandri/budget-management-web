import * as z from "zod"
import { resetPasswordSchema } from "./reset-password.schema"

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export type { ResetPasswordData }
