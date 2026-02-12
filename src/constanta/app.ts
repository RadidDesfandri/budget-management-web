const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email"
]

const protectedRoutes = [
  "/dashboard",
  "/preparation",
  "/expenses",
  "/budgets",
  "/categories",
  "/members",
  "/activity-logs",
  "/organization-settings",
  "/user-settings"
]

export { publicRoutes, protectedRoutes }
