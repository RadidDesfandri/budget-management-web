import * as z from "zod"
import { inviteMemberSchema, updateMemberRoleSchema } from "./member.schema"

type InviteMemberInput = z.infer<typeof inviteMemberSchema>
type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>

export type { InviteMemberInput, UpdateMemberRoleInput }
