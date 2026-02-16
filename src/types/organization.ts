import * as z from "zod"
import { organizationSchema } from "../schemas/organization-schema"
import { Dropdown } from "./global"

type Organization = z.infer<typeof organizationSchema>

interface OrganizationResponse {
  id: number
  owner_id: number
  name: string
  full_logo_url: string | null
  logo_url: string | null
  current_user_role: string
  created_at: string
  updated_at: string
}

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

export type {
  Organization,
  DropdownOrganization,
  DropdownOrganizationsResponse,
  DropdownOrganizationMeta,
  OrganizationResponse
}
