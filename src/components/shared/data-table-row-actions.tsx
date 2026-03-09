"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu"

export interface ActionItem<TData> {
  label: string
  icon?: React.ReactNode
  render?: (data: TData, trigger: React.ReactNode) => React.ReactNode
  onClick?: (data: TData) => void
  variant?: "default" | "destructive"
  separator?: "before" | "after"
  hidden?: (data: TData) => boolean
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actions: ActionItem<TData>[]
  label?: string
}

export function DataTableRowActions<TData>({
  row,
  actions,
  label = "Actions"
}: DataTableRowActionsProps<TData>) {
  const data = row.original
  const visibleActions = actions.filter((action) => !action.hidden?.(data))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {visibleActions.map((action, index) => {
          const triggerElement = (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick ? () => action.onClick!(data) : undefined}
              className={action.variant === "destructive" ? "text-destructive" : ""}
              onSelect={action.render ? (e) => e.preventDefault() : undefined}
            >
              {action.icon && <span className="mr-2 h-4 w-4">{action.icon}</span>}
              {action.label}
            </DropdownMenuItem>
          )

          return (
            <span key={index}>
              {action.separator === "before" && <DropdownMenuSeparator />}
              {action.render ? action.render(data, triggerElement) : triggerElement}
              {action.separator === "after" && <DropdownMenuSeparator />}
            </span>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
