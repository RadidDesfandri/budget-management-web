interface Invitation {
  id: number
  email: string
  role: string
  token: string
  expires_at: string
  accepted_at: string | null
  rejected_at: string | null
  created_at: string
  updated_at: string
  organization_id: number
}

export type { Invitation }
