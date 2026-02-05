import * as z from "zod"
import { userSchema } from "../schemas/user-schema"

type User = z.infer<typeof userSchema>

export type { User }
