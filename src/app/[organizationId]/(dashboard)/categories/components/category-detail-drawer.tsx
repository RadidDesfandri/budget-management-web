"use client"

import { DataTable } from "@/src/components/shared/data-table"
import { Button } from "@/src/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/src/components/ui/drawer"
import { Separator } from "@/src/components/ui/separator"
import { format } from "date-fns"
import { History, Info } from "lucide-react"
import { IoClose } from "react-icons/io5"
import { CategoryWithExpenses } from "../category.type"
import CategoryIcon from "./category-icon"
import { recentExpenseBudgets } from "../../budgets/components/budget-columns"

interface CategoryDetailDrawerProps {
  category: CategoryWithExpenses
  trigger: React.ReactNode
}

export function CategoryDetailDrawer({ category, trigger }: CategoryDetailDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center gap-3">
              <CategoryIcon
                icon={category.icon}
                iconColor={category.icon_color ?? "#fff"}
                backgroundColor={category.background_color ?? "#3b82f6"}
              />
              <div className="-space-y-1">
                <span className="text-xl font-semibold capitalize">{category.name}</span>
                <p className="text-muted-foreground text-sm font-semibold tracking-wider">
                  #{category.id}
                </p>
              </div>
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <IoClose />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="scrollbar-thin flex w-full flex-col gap-4 overflow-y-auto px-4 py-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
            <Info /> Category Details
          </div>

          <Separator />

          <div className="space-y-3 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Category ID</span>
              <span className="font-mono text-xs">#{category.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created By</span>
              <span className="font-mono text-xs capitalize">{category.created_by?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created Date</span>
              <span className="font-mono text-xs">
                {format(new Date(category.created_at), "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-mono text-xs">
                {format(new Date(category.updated_at), "MMM dd, yyyy HH:mm")}
              </span>
            </div>
          </div>

          <div className="text-muted-foreground flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
            <History /> Recent Expense
          </div>

          <Separator />

          <DataTable
            data={category.recent_expenses}
            columns={recentExpenseBudgets}
            headerSize="sm"
            enableColumnVisibility={false}
            enablePageSizeOptions={false}
            enableRowSelection={false}
            enablePagination={false}
          />
        </div>

        <DrawerFooter className="border-t">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
