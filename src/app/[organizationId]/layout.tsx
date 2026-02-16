export default async function OrganizationLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = await params

  console.log(organizationId)

  // 1. Cek apakah user punya akses ke Org ID ini via API Backend Anda
  // const hasAccess = await checkOrgAccess(organizationId);
  // if (!hasAccess) return notFound() atau redirect('/unauthorized');

  return <section>{children}</section>
}
