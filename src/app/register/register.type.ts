import * as z from "zod"
import { registerResponseSchema, registerSchema } from "./register.schema"

type RegisterData = z.infer<typeof registerSchema>
type RegisterResponse = z.infer<typeof registerResponseSchema>

export type { RegisterData, RegisterResponse }
