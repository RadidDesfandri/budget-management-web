import Logo from "@/src/components/shared/logo"
import InvitationError from "./components/invitation-error"
import InvitationSuccess from "./components/invitation-success"
import { verifyTokenInvitation } from "./actions"
import { getInvitationErrorProps } from "../invitation.config"

async function InvitationAcceptPage({
  searchParams
}: {
  searchParams: Promise<{ token: string }>
}) {
  const { token } = await searchParams

  if (!token) {
    return (
      <InvitationError
        title="Invalid Invitation Link"
        description="This invitation link is incomplete or invalid. Please make sure you are using the full link from your email."
        secondaryAction={{ label: "Go to Homepage", href: "/" }}
      />
    )
  }

  const { statusCode, error, data } = await verifyTokenInvitation(token)

  if (error) {
    const { title, description } = getInvitationErrorProps(statusCode, error)

    return (
      <InvitationError
        title={title}
        description={description}
        secondaryAction={{ label: "Go to Homepage", href: "/" }}
      />
    )
  }

  if (!data) {
    return (
      <InvitationError
        title="Invitation Error"
        description="We couldn't verify this invitation. The link may be broken or invalid. Please ask your administrator to send a new one."
        secondaryAction={{ label: "Go to Homepage", href: "/" }}
      />
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 p-5">
      <div className="absolute top-5 left-5">
        <Logo />
      </div>

      <InvitationSuccess
        token={token}
        role={data.role}
        email={data.email}
        expiresAt={data.expires_at}
        organizationName={data.organization.name}
        organizationLogoUrl={data.organization.full_logo_url || ""}
      />
    </div>
  )
}

export default InvitationAcceptPage
