import { NextResponse, NextRequest } from "next/server"
import { protectedRoutes, publicRoutes } from "./constanta/app"

const TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token"

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value
  const { pathname } = request.nextUrl

  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return Response.redirect(url)
  }

  if (token && publicRoutes.includes(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return Response.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
