import Cookies from "js-cookie"

const TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token"

export const authToken = {
  set: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    })
  },

  get: (): string | undefined => {
    return Cookies.get(TOKEN_KEY)
  },

  remove: () => {
    Cookies.remove(TOKEN_KEY)
  }
}
