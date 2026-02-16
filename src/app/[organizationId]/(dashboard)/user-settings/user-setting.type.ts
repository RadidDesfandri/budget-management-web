import * as z from "zod"
import { changePasswordSchema, editProfileSchema } from "./user-setting.schema"

type EditProfileData = z.infer<typeof editProfileSchema>
type ChangePasswordData = z.infer<typeof changePasswordSchema>

export type { EditProfileData, ChangePasswordData }
