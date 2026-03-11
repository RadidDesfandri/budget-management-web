"use client"

import { useEffect, useState } from "react"
import { CreateExpenseData } from "../expense.type"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createExpenseSchema } from "../expense.schema"
import { useGetCategories } from "../../categories/category.api"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { Input } from "@/src/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Calendar } from "@/src/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/src/components/ui/command"
import { Textarea } from "@/src/components/ui/textarea"
import { ReceiptUpload } from "../create/components/receipt-upload"
import Link from "next/link"

interface ExpenseFormProps {
  organizationId: string
  mode: "create" | "edit"
  defaultValues?: Partial<CreateExpenseData & { receipt_url?: string }>
  onSubmit: (values: CreateExpenseData) => void
  isPending: boolean
  fieldErrors?: Record<string, string>
}

function ExpenseForm({
  organizationId,
  mode,
  defaultValues,
  onSubmit,
  isPending,
  fieldErrors
}: ExpenseFormProps) {
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false)

  const form = useForm<CreateExpenseData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      amount: defaultValues?.amount ?? undefined,
      description: defaultValues?.description ?? "",
      category_id: defaultValues?.category_id ?? "",
      expense_date: defaultValues?.expense_date ?? "",
      receipt: undefined
    }
  })

  const { data: categories } = useGetCategories(organizationId)

  useEffect(() => {
    if (!fieldErrors) return
    Object.entries(fieldErrors).forEach(([key, message]) => {
      form.setError(key as keyof CreateExpenseData, { type: "server", message })
    })
  }, [fieldErrors, form])

  const isEdit = mode === "edit"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold md:text-3xl">
              {isEdit ? "Edit Expense" : "Submit New Expense"}
            </CardTitle>
            <CardDescription>
              {isEdit
                ? "Update the details below to modify this expense."
                : "Enter the detail below to request reimbursement for business related cost."}
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. Lunch" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="expense_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Transaction</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "w-full justify-between font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? format(new Date(field.value), "dd MMMM, yyyy")
                                : "mm/dd/yyyy"}
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) =>
                              field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                            }
                            disabled={isPending}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Category</FormLabel>
                      <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between font-normal capitalize",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? categories?.find((c) => String(c.id) === field.value)?.name
                                : "Select category"}
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {categories?.map((category) => (
                                  <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    className="capitalize"
                                    onSelect={() => {
                                      field.onChange(String(category.id))
                                      setCategoryOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 size-4",
                                        field.value === String(category.id)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {category.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const [displayValue, setDisplayValue] = useState(
                    field.value ? Number(field.value).toLocaleString("id-ID") : ""
                  )

                  return (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <div className="relative">
                        <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                          Rp
                        </span>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            disabled={isPending}
                            placeholder="100.000"
                            className="pl-9"
                            value={displayValue}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, "")
                              setDisplayValue(raw ? Number(raw).toLocaleString("id-ID") : "")
                              field.onChange(raw ? Number(raw) : undefined)
                            }}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        disabled={isPending}
                        className="min-h-24"
                        placeholder="What was this expense for? Please include project codes if applicable"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ReceiptUpload
                control={form.control}
                name="receipt"
                disabled={isPending}
                existingReceiptUrl={isEdit ? defaultValues?.receipt_url : undefined}
              />
            </div>
          </CardContent>

          <Separator />

          <CardFooter className="flex justify-end gap-3">
            <Button size="lg" asChild type="button" variant="outline" disabled={isPending}>
              <Link href={`/${organizationId}/expenses`}>Cancel</Link>
            </Button>
            <Button size="lg" type="submit" disabled={isPending}>
              {isPending
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                  ? "Save Changes"
                  : "Create Expense"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default ExpenseForm
