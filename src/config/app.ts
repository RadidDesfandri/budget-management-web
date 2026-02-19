const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/invitation/accept"
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
