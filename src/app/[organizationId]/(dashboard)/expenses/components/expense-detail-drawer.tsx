import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
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
import { Label } from "@/src/components/ui/label"
import { Separator } from "@/src/components/ui/separator"
import { formatRupiah, getInitialUsername } from "@/src/lib/utils"
import { ExpenseWithRelations } from "@/src/types/expense"
import { format } from "date-fns"
import Link from "next/link"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { ExpenseStatusCell } from "./expense-status-cell"
import ReceiptPreview from "./receipt-preview"

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-muted-foreground tracking-wider uppercase">{label}</Label>
      <div className="text-sm capitalize">{value}</div>
    </div>
  )
}

interface ExpenseDetailDrawerProps {
  expense: ExpenseWithRelations
  trigger: React.ReactNode
}

export function ExpenseDetailDrawer({ expense, trigger }: ExpenseDetailDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>Expense Details</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <IoClose />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="scrollbar-thin flex flex-col gap-7 overflow-y-auto px-4 py-4">
          <div>
            <div className="flex items-center gap-2">
              <ExpenseStatusCell expense={expense} />
              <p className="text-sm font-semibold tracking-wider">#{expense.id}</p>
            </div>
            <p className="text-xl font-semibold capitalize">{expense.title}</p>
            <p className="text-3xl font-bold">{formatRupiah(expense.amount)}</p>
          </div>

          <Separator />

          {expense.description && <DetailItem label="Description" value={expense.description} />}

          <div className="grid grid-cols-2 gap-5">
            <DetailItem label="Expense Date" value={format(expense.expense_date, "MMM dd, yyyy")} />
            <DetailItem label="Category" value={expense.category.name} />
            <DetailItem
              label="Submitted By"
              value={
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarImage src={expense.user.full_avatar_url ?? ""} />
                    <AvatarFallback>{getInitialUsername(expense.user.name ?? "")}</AvatarFallback>
                  </Avatar>
                  <span>{expense.user.name}</span>
                </div>
              }
            />
          </div>

          {expense.rejected_at && expense.rejected_reason && expense.rejected_by && (
            <Alert variant="destructive">
              <AlertTitle className="mb-3 flex items-center gap-2">
                <IoMdInformationCircleOutline />
                Rejection Details
              </AlertTitle>

              <AlertDescription className="grid w-full grid-cols-2 gap-3">
                <div className="flex flex-col tracking-wider">
                  <Label className="text-xs text-red-400 uppercase">Rejected Date</Label>
                  <p className="text-red-900">{format(expense.rejected_at, "MMM dd, yyyy")}</p>
                </div>
                <div className="flex flex-col tracking-wider">
                  <Label className="text-xs text-red-400 uppercase">Rejected By</Label>
                  <p className="text-red-900">{expense.rejected_by.name}</p>
                </div>
                <div className="col-span-2 flex flex-col">
                  <Label className="text-xs tracking-wider text-red-400 uppercase">
                    Rejection Reason
                  </Label>
                  <p className="text-red-900">{expense.rejected_reason}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {expense.approved_at && expense.approved_by && (
            <Alert variant="success" className="w-full">
              <AlertTitle className="mb-3 flex items-center gap-2">
                <IoMdInformationCircleOutline />
                Approval Details
              </AlertTitle>

              <AlertDescription className="grid w-full grid-cols-2 gap-3">
                <div className="flex flex-col tracking-wider">
                  <Label className="text-xs text-green-400 uppercase">Approved Date</Label>
                  <p className="text-green-900">{format(expense.approved_at, "MMM dd, yyyy")}</p>
                </div>
                <div className="flex flex-col tracking-wider">
                  <Label className="text-xs text-green-400 uppercase">Approved By</Label>
                  <p className="text-green-900">{expense.approved_by.name}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {expense.receipt_url && (
            <ReceiptPreview
              fullReceiptUrl={expense.full_receipt_url}
              receiptUrl={expense.receipt_url}
            />
          )}
        </div>

        <DrawerFooter className="grid grid-cols-2 gap-3 border-t">
          <Button asChild>
            <Link href={`/${expense.organization_id}/expenses/edit/${expense.id}`}>
              Edit Expense
            </Link>
          </Button>
          <Button variant="outline">Download PDF</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
