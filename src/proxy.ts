import { NextRequest, NextResponse } from "next/server"
import { routeConfig } from "./config/route"

const TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token"

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value
  const currentOrgId = request.cookies.get("current_organization_id")?.value
  const { pathname, searchParams } = request.nextUrl

  const isPublicRoute = routeConfig.public.some((regex) => regex.test(pathname))
  const isPrivateRoute = routeConfig.private.some((regex) => regex.test(pathname))

  if (!token && isPrivateRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return Response.redirect(url)
  }

  if (token && isPublicRoute) {
    if (searchParams.has("token") || searchParams.has("redirect")) {
      return NextResponse.next()
    }

    const url = request.nextUrl.clone()

    if (currentOrgId) {
      url.pathname = `/${currentOrgId}/dashboard`
    } else {
      url.pathname = "/organizations"
    }

    return Response.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
