import { loginResponseSchema, loginSchema } from "./login.schema"
import * as z from "zod"

type LoginData = z.infer<typeof loginSchema>
type LoginResponse = z.infer<typeof loginResponseSchema>

export type { LoginData, LoginResponse }
