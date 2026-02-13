import * as z from "zod"
import { createOrganizationSchema } from "./preparation.schema"

type OrganizationData = z.infer<typeof createOrganizationSchema>

export type { OrganizationData }
