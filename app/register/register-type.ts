import { registerSchema } from "./register-schema"
import * as z from "zod"

export type RegisterData = z.infer<typeof registerSchema>
