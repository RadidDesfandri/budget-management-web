"use client"

import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  PlusCircle,
  Pencil,
  Trash2,
  UserPlus,
  UserMinus,
  Shield,
  Tag,
  Building2,
  LogIn,
  LogOut,
  Wallet,
  Dot
} from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { cn, getInitialUsername } from "@/src/lib/utils"
import { ActivityLog, ActivityLogActionType } from "../activity-log.type"

const ACTION_CONFIG: Record<
  ActivityLogActionType,
  {
    label: string
    icon: React.ElementType
    iconBg: string
    iconColor: string
    badgeVariant: "default" | "secondary" | "destructive" | "outline"
    badgeClass: string
  }
> = {
  expense_created: {
    label: "Expense Created",
    icon: PlusCircle,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeVariant: "outline",
    badgeClass: "border-blue-200 text-blue-700 bg-blue-50"
  },
  expense_updated: {
    label: "Expense Updated",
    icon: Pencil,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeVariant: "outline",
    badgeClass: "border-amber-200 text-amber-700 bg-amber-50"
  },
  expense_deleted: {
    label: "Expense Deleted",
    icon: Trash2,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    badgeVariant: "destructive",
    badgeClass: "border-red-200 text-red-700 bg-red-50"
  },
  expense_approved: {
    label: "Expense Approved",
    icon: CheckCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    badgeVariant: "outline",
    badgeClass: "border-green-200 text-green-700 bg-green-50"
  },
  expense_rejected: {
    label: "Expense Rejected",
    icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    badgeVariant: "destructive",
    badgeClass: "border-red-200 text-red-700 bg-red-50"
  },
  budget_created: {
    label: "Budget Created",
    icon: Wallet,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    badgeVariant: "outline",
    badgeClass: "border-violet-200 text-violet-700 bg-violet-50"
  },
  budget_updated: {
    label: "Budget Updated",
    icon: Pencil,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeVariant: "outline",
    badgeClass: "border-amber-200 text-amber-700 bg-amber-50"
  },
  budget_deleted: {
    label: "Budget Deleted",
    icon: Trash2,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    badgeVariant: "destructive",
    badgeClass: "border-red-200 text-red-700 bg-red-50"
  },
  member_invited: {
    label: "Member Invited",
    icon: UserPlus,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    badgeVariant: "outline",
    badgeClass: "border-teal-200 text-teal-700 bg-teal-50"
  },
  member_removed: {
    label: "Member Removed",
    icon: UserMinus,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    badgeVariant: "destructive",
    badgeClass: "border-red-200 text-red-700 bg-red-50"
  },
  member_role_updated: {
    label: "Role Updated",
    icon: Shield,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    badgeVariant: "outline",
    badgeClass: "border-indigo-200 text-indigo-700 bg-indigo-50"
  },
  invitation_accepted: {
    label: "Invitation Accepted",
    icon: CheckCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    badgeVariant: "outline",
    badgeClass: "border-green-200 text-green-700 bg-green-50"
  },
  invitation_rejected: {
    label: "Invitation Rejected",
    icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    badgeVariant: "destructive",
    badgeClass: "border-red-200 text-red-700 bg-red-50"
  },
  category_created: {
    label: "Category Created",
    icon: Tag,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    badgeVariant: "outline",
    badgeClass: "border-pink-200 text-pink-700 bg-pink-50"
  },
  category_updated: {
    label: "Category Updated",
    icon: Pencil,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeVariant: "outline",
    badgeClass: "border-amber-200 text-amber-700 bg-amber-50"
  },
  category_deleted: {
    label: "Category Deleted",
    icon: Trash2,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    badgeVariant: "destructive",
    badgeClass: "border-red-200 text-red-700 bg-red-50"
  },
  organization_updated: {
    label: "Org. Updated",
    icon: Building2,
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
    badgeVariant: "outline",
    badgeClass: "border-slate-200 text-slate-700 bg-slate-50"
  },
  user_login: {
    label: "User Login",
    icon: LogIn,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    badgeVariant: "outline",
    badgeClass: "border-cyan-200 text-cyan-700 bg-cyan-50"
  },
  user_logout: {
    label: "User Logout",
    icon: LogOut,
    iconBg: "bg-gray-50",
    iconColor: "text-gray-500",
    badgeVariant: "secondary",
    badgeClass: "border-gray-200 text-gray-600 bg-gray-50"
  }
}

interface ActivityLogItemProps {
  log: ActivityLog
  index: number
}

export function ActivityLogItem({ log, index }: ActivityLogItemProps) {
  const config = ACTION_CONFIG[log.action_type]
  const Icon = config.icon

  const createdAt = new Date(log.created_at)
  const relativeTime = formatDistanceToNow(createdAt, { addSuffix: true })
  const absoluteTime = format(createdAt, "dd MMM yyyy, HH:mm")

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: (index % 15) * 0.04, ease: "easeOut" }}
      className="group flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          config.iconBg
        )}
      >
        <Icon className={cn("h-5 w-5", config.iconColor)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-6 w-6">
              <AvatarImage src={log.user.full_avatar_url ?? undefined} alt={log.user.name ?? ""} />
              <AvatarFallback className="text-[10px]">
                {getInitialUsername(log.user.name ?? log.user.email)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold text-gray-900">{log.user.name}</span>
          </div>

          {/* Action badge */}
          <Badge variant="outline" className={cn("text-xs font-medium", config.badgeClass)}>
            {config.label}
          </Badge>
        </div>

        <p className="mt-1 text-sm leading-relaxed text-gray-600">{log.description}</p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
          <span title={absoluteTime}>{relativeTime}</span>
          <Dot />
          <span>{absoluteTime}</span>
          {log.ip_address && (
            <>
              <Dot />
              <span className="leading-relaxed">{log.ip_address}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
