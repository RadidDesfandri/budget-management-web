import { cookies } from "next/headers"
import { getOrganization } from "./organization.api"
import { notFound, redirect } from "next/navigation"

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

  const { statusCode } = await getOrganization(organizationId, token)

  if (statusCode === 404) return notFound()

  if (statusCode === 403) redirect("/403")

  return <section>{children}</section>
}
