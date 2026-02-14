import { Row } from "@tanstack/react-table"
import { MoreHorizontal, Copy, Edit, Trash } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  onEdit?: (data: TData) => void
  onDelete?: (data: TData) => void
  onCopy?: (data: TData) => void
  customActions?: {
    label: string
    icon?: React.ReactNode
    onClick: (data: TData) => void
    variant?: "default" | "destructive"
  }[]
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
  onCopy,
  customActions
}: DataTableRowActionsProps<TData>) {
  const data = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {onCopy && (
          <DropdownMenuItem onClick={() => onCopy(data)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </DropdownMenuItem>
        )}

        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(data)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {customActions?.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => action.onClick(data)}
            className={action.variant === "destructive" ? "text-destructive" : ""}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </DropdownMenuItem>
        ))}

        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(data)} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
