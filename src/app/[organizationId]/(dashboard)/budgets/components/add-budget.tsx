import { Button } from "@/src/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/src/components/ui/command"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { MonthYearPicker } from "@/src/components/ui/month-year-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { cn } from "@/src/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useGetCategories } from "../../categories/category.api"
import { useAddBudget } from "../budget.api"
import { addBudgetSchema } from "../budget.schema"
import { AddBudgetInput } from "../budget.type"

function AddBudget() {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { mutate, isPending } = useAddBudget(organizationId)
  const { data: categories } = useGetCategories(organizationId)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const form = useForm<AddBudgetInput>({
    resolver: zodResolver(addBudgetSchema),
    defaultValues: {
      amount: undefined,
      category_id: "",
      month: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
      }
    }
  })

  const onSubmit = (values: AddBudgetInput) => {
    mutate(values, {
      onSuccess: () => {
        setIsOpen(false)
        form.reset()
      },
      onError: (error) => {
        if (!error.fieldErrors) return
        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof AddBudgetInput, {
            type: "server",
            message
          })
        })
      }
    })
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      form.reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add Budget
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Set New Budget</DialogTitle>
              <DialogDescription>Add a new budget for your organization.</DialogDescription>
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

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                          Rp
                        </span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          disabled={isPending}
                          placeholder="100.000.000"
                          className="pl-9"
                          value={field.value ? Number(field.value).toLocaleString("id-ID") : ""}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, "")
                            field.onChange(raw ? Number(raw) : undefined)
                          }}
                        />
                      </div>
                    </FormControl>
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
                {isPending ? "Saving..." : "Save Budget"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBudget
