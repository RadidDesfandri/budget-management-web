import * as z from "zod"
import { organizationSchema } from "../schemas/organization-schema"

type Organization = z.infer<typeof organizationSchema>

export type { Organization }
