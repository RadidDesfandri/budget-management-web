import { OrganizationProvider } from "@/src/context/organization-context"
import { cookies } from "next/headers"
import { forbidden, notFound } from "next/navigation"
import { getOrganization } from "./organization.api"

const TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token"

export default async function OrganizationLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get(TOKEN_KEY)?.value

  const { statusCode, data } = await getOrganization(organizationId, token)

  if (statusCode === 404) notFound()

  if (statusCode === 403) forbidden()

  if (!data) notFound()

  return <OrganizationProvider value={data}>{children}</OrganizationProvider>
}
