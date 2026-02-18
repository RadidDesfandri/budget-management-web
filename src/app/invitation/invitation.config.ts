function getInvitationErrorProps(statusCode: number, message?: string) {
  if (statusCode === 404 || message?.toLowerCase().includes("does not exist")) {
    return {
      title: "Invitation Not Found",
      description:
        "This invitation link is invalid or doesn't exist. Please check the link in your email or ask your administrator for a new one."
    }
  }

  if (message?.toLowerCase().includes("already been accepted")) {
    return {
      title: "Invitation Already Accepted",
      description:
        "This invitation has already been accepted. If you believe this is a mistake, please contact your administrator."
    }
  }

  if (message?.toLowerCase().includes("already been rejected")) {
    return {
      title: "Invitation Already Rejected",
      description:
        "This invitation was previously rejected. If you'd like to join, please ask your administrator to send a new invitation."
    }
  }

  if (message?.toLowerCase().includes("has expired")) {
    return {
      title: "Invitation Expired",
      description:
        "This invitation link has expired. Please ask your administrator to send a new invitation."
    }
  }

  return {
    title: "Invitation Error",
    description:
      "We couldn't verify this invitation. The link may be broken or invalid. Please ask your administrator to send a new one."
  }
}

export { getInvitationErrorProps }
