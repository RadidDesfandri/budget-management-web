import * as z from "zod"
import { acceptInvitationSchema, createOrganizationSchema } from "./preparation.schema"

type OrganizationData = z.infer<typeof createOrganizationSchema>
type AcceptInvitationData = z.infer<typeof acceptInvitationSchema>

export type { OrganizationData, AcceptInvitationData }
