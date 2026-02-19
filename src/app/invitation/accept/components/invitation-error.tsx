import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"
import { Link2OffIcon } from "lucide-react"
import Link from "next/link"

interface InvitationErrorProps {
  title: string
  description: string
  primaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  supportText?: string
  supportLinkLabel?: string
  supportLinkHref?: string
}

// title = "Invitation Expired",
// description = "We couldn't verify this invitation. It may have expired, or the link might be broken. If you believe this is a mistake, please ask your administrator to send a new one.",

function InvitationError({
  title,
  description,
  primaryAction = {
    label: "Request New Invite"
  },
  secondaryAction,
  supportText = "Need help?",
  supportLinkLabel = "Contact our support team",
  supportLinkHref = "#"
}: InvitationErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-5">
      <Card className="w-full overflow-hidden pt-0 md:max-w-md">
        <div className="relative flex items-center justify-center bg-red-50 py-12">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle, #fca5a5 1px, transparent 1px)",
              backgroundSize: "16px 16px"
            }}
          />
          <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-white shadow-sm">
            <Link2OffIcon className="size-7 text-red-500" />
          </div>
        </div>

        <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>

          <Button
            size="lg"
            className="w-full"
            variant="destructive"
            onClick={primaryAction.onClick}
            asChild={!!primaryAction.href}
          >
            {primaryAction.href ? (
              <Link href={primaryAction.href}>{primaryAction.label}</Link>
            ) : (
              primaryAction.label
            )}
          </Button>

          {secondaryAction && secondaryAction.label && (
            <Button
              size="lg"
              variant="ghost"
              className="w-full"
              type="button"
              onClick={secondaryAction.onClick}
              asChild={!!secondaryAction.href}
            >
              {secondaryAction.href ? (
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              ) : (
                secondaryAction.label
              )}
            </Button>
          )}
        </CardContent>

        <CardFooter className="justify-center border-t pt-4">
          <p className="text-muted-foreground text-xs">
            {supportText}{" "}
            <Link href={supportLinkHref} className="font-medium text-red-600 hover:underline">
              {supportLinkLabel}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default InvitationError
