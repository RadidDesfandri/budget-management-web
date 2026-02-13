import * as z from "zod"
import { organizationSchema } from "../schemas/organization-schema"
import { Dropdown } from "./global"

type Organization = z.infer<typeof organizationSchema>

interface DropdownOrganization extends Dropdown {
  full_logo_url: string | null
}

interface DropdownOrganizationMeta {
  active_organization_id: number
  active_organization_info: DropdownOrganization
}

interface DropdownOrganizationsResponse {
  meta: DropdownOrganizationMeta
  organizations: DropdownOrganization[]
}

interface SetActiveOrganizationPayload {
  organization_id: number
}

export type {
  Organization,
  DropdownOrganization,
  DropdownOrganizationsResponse,
  DropdownOrganizationMeta,
  SetActiveOrganizationPayload
}
