"use client"

import { useForm } from "react-hook-form"
import { AddBudgetInput } from "../budget.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { addBudgetSchema } from "../budget.schema"
import { useEffect, useState } from "react"
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
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/src/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/src/components/ui/command"
import { Input } from "@/src/components/ui/input"
import { MonthYearPicker } from "@/src/components/ui/month-year-picker"

interface BudgetFormProps {
  organizationId: string
  mode: "create" | "edit"
  defaultValues?: Partial<AddBudgetInput>
  onSubmit: (values: AddBudgetInput) => void
  isPending: boolean
  fieldErrors?: Record<string, string>
}

function BudgetForm({
  organizationId,
  mode,
  defaultValues,
  onSubmit,
  isPending,
  fieldErrors
}: BudgetFormProps) {
  const [categoryOpen, setCategoryOpen] = useState(false)
  const { data: categories } = useGetCategories(organizationId)

  const form = useForm<AddBudgetInput>({
    resolver: zodResolver(addBudgetSchema),
    defaultValues: {
      amount: defaultValues?.amount ?? undefined,
      category_id: defaultValues?.category_id ?? "",
      month: {
        year: defaultValues?.month?.year ?? new Date().getFullYear(),
        month: defaultValues?.month?.month ?? new Date().getMonth()
      }
    }
  })

  const amount = form.watch("amount")

  const [displayValue, setDisplayValue] = useState(
    amount ? Number(amount).toLocaleString("id-ID") : ""
  )

  useEffect(() => {
    if (!fieldErrors) return
    Object.entries(fieldErrors).forEach(([key, message]) => {
      form.setError(key as keyof AddBudgetInput, { type: "server", message })
    })
  }, [fieldErrors, form])

  const isEdit = mode === "edit"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Budget" : "Set New Budget"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit the budget for your organization."
              : "Add a new budget for your organization."}
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-6">
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
                                  field.value === String(category.id) ? "opacity-100" : "opacity-0"
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
            )}
          />

          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <FormControl>
                  <MonthYearPicker
                    className="w-full"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Save Changes"
                : "Create Budget"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default BudgetForm
