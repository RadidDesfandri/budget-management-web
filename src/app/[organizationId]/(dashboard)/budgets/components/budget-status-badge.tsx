export const getStatus = (pct: number) => {
  if (pct <= 75)
    return {
      label: "On Track",
      color: "bg-emerald-500",
      badgeBg: "bg-emerald-500/10",
      textColor: "text-emerald-800"
    }
  if (pct <= 90)
    return {
      label: "Near Limit",
      color: "bg-amber-400",
      badgeBg: "bg-amber-400/10",
      textColor: "text-amber-800"
    }
  return {
    label: "Over Budget",
    color: "bg-red-500",
    badgeBg: "bg-red-500/10",
    textColor: "text-red-800"
  }
}

interface BudgetStatusBadgeProps {
  percentage: number
}

export function BudgetStatusBadge({ percentage }: BudgetStatusBadgeProps) {
  const { label, badgeBg, textColor } = getStatus(percentage)

  return <p className={`rounded-md p-1 text-xs font-medium ${badgeBg} ${textColor}`}>{label}</p>
}
