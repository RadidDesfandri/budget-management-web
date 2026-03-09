import { ExpenseWithRelations } from "@/src/types/expense"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/src/components/ui/drawer"
import { Button } from "@/src/components/ui/button"

interface ExpenseDetailDrawerProps {
  expense: ExpenseWithRelations
  trigger: React.ReactNode
}

export function ExpenseDetailDrawer({ expense, trigger }: ExpenseDetailDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Expense</DrawerTitle>
          <DrawerDescription>Expense details</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
