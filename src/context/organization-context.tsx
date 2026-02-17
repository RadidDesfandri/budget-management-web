"use client"

import { createContext, useContext } from "react"
import { OrganizationResponse } from "../types/organization"

type OrganizationContextType = {
  organization: OrganizationResponse
}

const OrganizationContext = createContext<OrganizationContextType | null>(null)

export function OrganizationProvider({
  children,
  value
}: {
  children: React.ReactNode
  value: OrganizationResponse
}) {
  return (
    <OrganizationContext.Provider value={{ organization: value }}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)

  if (!context) {
    throw new Error("useOrganization must be used within a OrganizationProvider")
  }

  return context
}
