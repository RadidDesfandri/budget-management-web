import * as z from "zod"
import { inviteMemberSchema } from "./member.schema"

type InviteMemberInput = z.infer<typeof inviteMemberSchema>

export type { InviteMemberInput }
