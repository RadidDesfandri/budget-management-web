"use client"

import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card"
import { useParams } from "next/navigation"
import { useCreateExpense } from "../expense.api"
import { useForm } from "react-hook-form"
import { CreateExpenseData } from "../expense.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { createExpenseSchema } from "../expense.schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Calendar } from "@/src/components/ui/calendar"
import { useGetCategories } from "../../categories/category.api"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/src/components/ui/command"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { format } from "date-fns"
import { Separator } from "@/src/components/ui/separator"
import { Textarea } from "@/src/components/ui/textarea"
import { ReceiptUpload } from "./components/receipt-upload"

function CreateExpense() {
  const params = useParams()
  const organizationId = params.organizationId as string

  // prettier-ignore
  const { mutateAsync: createExpense, isPending: isCreatingExpense } = useCreateExpense(organizationId)

  const [categoryOpen, setCategoryOpen] = useState<boolean>(false)

  const form = useForm<CreateExpenseData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: "",
      amount: undefined,
      description: "",
      category_id: "",
      expense_date: "",
      receipt: undefined
    }
  })

  const { data: categories } = useGetCategories(organizationId)

  function onSubmit(values: CreateExpenseData) {
    createExpense(values, {
      onError: (error) => {
        if (!error.fieldErrors) return

        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof CreateExpenseData, {
            type: "server",
            message
          })
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold md:text-3xl">Submit New Expense</CardTitle>
            <CardDescription>
              Enter the detail below to request reimbursement for business related cost.
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
                      <Input
                        type="text"
                        placeholder="e.g. Lunch"
                        disabled={isCreatingExpense}
                        {...field}
                      />
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
                            selected={new Date(field.value)}
                            onSelect={(date) => field.onChange(format(date!, "yyyy-MM-dd"))}
                            disabled={isCreatingExpense}
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
                render={({ field }) => (
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
                          disabled={isCreatingExpense}
                          placeholder="100.000"
                          className="pl-9"
                          value={field.value ? Number(field.value).toLocaleString("id-ID") : ""}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, "")
                            field.onChange(raw ? Number(raw) : undefined)
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
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
                        disabled={isCreatingExpense}
                        className="min-h-24"
                        placeholder="What was this expense for? Please include project codes if applicable"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ReceiptUpload control={form.control} name="receipt" disabled={isCreatingExpense} />
            </div>
          </CardContent>

          <Separator />

          <CardFooter className="flex justify-end gap-3">
            <Button variant="outline" disabled={isCreatingExpense}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreatingExpense}>
              {isCreatingExpense ? "Creating..." : "Create Expense"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default CreateExpense
