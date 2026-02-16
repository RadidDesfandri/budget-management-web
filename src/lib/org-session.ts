import Cookies from "js-cookie"

const setCurrentOrganization = (organizationId: string) => {
  Cookies.set("current_organization_id", organizationId, {
    expires: 1,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  })
}

export { setCurrentOrganization }
