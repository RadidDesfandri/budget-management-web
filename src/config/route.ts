const routeConfig = {
  public: [
    /^\/$/,
    /^\/login$/,
    /^\/register$/,
    /^\/verify-email(\/.*)?$/,
    /^\/invitation\/accept(\/.*)?$/,
    /^\/forgot-password$/,
    /^\/reset-password(\/.*)?$/
  ],
  private: [
    /^\/dashboard$/,
    /^\/preparation$/,
    /^\/expenses$/,
    /^\/budgets$/,
    /^\/categories$/,
    /^\/members$/,
    /^\/activity-logs$/,
    /^\/organization-settings$/,
    /^\/user-settings$/
  ]
}

export { routeConfig }
