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
import { Pencil } from "lucide-react"
import { IoClose } from "react-icons/io5"
import { BudgetData } from "../budget.type"
import { recentExpenseBudgets } from "./budget-columns"
import { BudgetInfo } from "./budget-info"
import { BudgetSummaryCards } from "./budget-summary-card"
import EditBudget from "./edit-budget"

interface DetailBudgetProps {
  budget: BudgetData
  trigger: React.ReactNode
}

function DetailBudget({ budget, trigger }: DetailBudgetProps) {
  const budgetNum = parseFloat(String(budget.budget))
  const percentage = budgetNum > 0 ? Math.min(Math.round((budget.used / budgetNum) * 100), 100) : 0

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Budget Details</DrawerTitle>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm capitalize">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: budget.category.icon_color ?? "#fff" }}
                />
                {budget.category.name}
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <IoClose />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="scrollbar-thin flex flex-col gap-7 overflow-y-auto px-4 py-4">
          <BudgetSummaryCards
            budget={budgetNum}
            used={budget.used}
            remaining={budget.remaining}
            percentage={percentage}
          />

          <BudgetInfo
            month={budget.month}
            updatedAt={budget.updated_at}
            createdBy={budget.created_by}
            category={budget.category}
          />

          <div>
            <p className="text-muted-foreground mb-1 text-sm font-bold tracking-wider uppercase">
              Recent Expense
            </p>
            <Separator />

            <DataTable
              data={budget.expenses}
              columns={recentExpenseBudgets}
              headerSize="sm"
              enableColumnVisibility={false}
              enablePageSizeOptions={false}
              enableRowSelection={false}
              enablePagination={false}
            />
          </div>
        </div>

        <DrawerFooter className="border-t bg-neutral-50">
          <EditBudget
            budget={budget}
            trigger={
              <Button>
                <Pencil /> Edit Budget
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DetailBudget
