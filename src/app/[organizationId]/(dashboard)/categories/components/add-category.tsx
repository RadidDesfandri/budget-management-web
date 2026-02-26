"use client"

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
import { Button } from "@/src/components/ui/button"
import { Plus } from "lucide-react"
import { PermissionGuard } from "@/src/components/shared/permission-guard"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { categorySchema } from "../category.schema"
import { CategoryInput } from "../category.type"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { BACKGROUND_COLORS, CATEGORY_ICONS, ICON_COLORS } from "../category.config"
import ColorSwatch from "./color-swatch"
import { cn } from "@/src/lib/utils"
import { useAddCategory } from "../category.api"

const AddCategory = () => {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { mutate, isPending } = useAddCategory(organizationId)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      icon: "",
      icon_color: "",
      background_color: ""
    }
  })

  const watchedValues = form.watch()

  const onSubmit = (values: CategoryInput) => {
    mutate(values, {
      onSuccess: () => {
        setIsOpen(false)
        form.reset()
      },
      onError: (error) => {
        if (!error.fieldErrors) return
        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof CategoryInput, {
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
      form.reset({
        name: "",
        icon: "",
        icon_color: ICON_COLORS[5].value,
        background_color: BACKGROUND_COLORS[5].value
      })
    }
  }

  const selectedIconObj = CATEGORY_ICONS.find((i) => i.value === watchedValues.icon)
  const SelectedIcon = selectedIconObj?.icon

  return (
    <PermissionGuard action="category:create">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
                <DialogDescription>Add a new category to your organization.</DialogDescription>
              </DialogHeader>

              <div className="my-6 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          disabled={isPending}
                          placeholder="e.g, Marketing"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category Icon <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input type="hidden" {...field} />
                      </FormControl>

                      <div className="scrollbar-thin scrollbar-thumb-neutral-200 flex gap-2 overflow-x-auto p-2 pb-1">
                        {CATEGORY_ICONS.map((icon) => {
                          const IconComponent = icon.icon
                          const isSelected = field.value === icon.value
                          return (
                            <button
                              key={icon.value}
                              type="button"
                              title={icon.label}
                              onClick={() => field.onChange(icon.value)}
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 transition-all hover:scale-105",
                                isSelected
                                  ? "scale-105 shadow-sm"
                                  : "border-neutral-200 bg-white hover:border-neutral-300"
                              )}
                              style={
                                isSelected
                                  ? {
                                      borderColor: watchedValues.icon_color || "#e5e7eb",
                                      backgroundColor: watchedValues.background_color || "#f3f4f6"
                                    }
                                  : {}
                              }
                            >
                              <IconComponent
                                className="h-5 w-5"
                                style={{
                                  color: isSelected
                                    ? watchedValues.icon_color || "currentColor"
                                    : undefined
                                }}
                              />
                            </button>
                          )
                        })}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="icon_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon Color</FormLabel>
                        <FormControl>
                          <input type="hidden" {...field} />
                        </FormControl>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {ICON_COLORS.map((color) => (
                            <ColorSwatch
                              key={color.value}
                              color={color}
                              selected={field.value === color.value}
                              onClick={() => field.onChange(color.value)}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="background_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Background Color</FormLabel>
                        <FormControl>
                          <input type="hidden" {...field} />
                        </FormControl>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {BACKGROUND_COLORS.map((color) => (
                            <ColorSwatch
                              key={color.value}
                              color={color}
                              selected={field.value === color.value}
                              onClick={() => field.onChange(color.value)}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-lg border border-dashed border-neutral-300 bg-gray-50 p-3">
                  <p className="text-muted-foreground text-xs font-medium uppercase">
                    Live Preview
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-all"
                      style={{
                        backgroundColor: watchedValues.background_color || "#e5e7eb"
                      }}
                    >
                      {SelectedIcon ? (
                        <SelectedIcon
                          className="h-5 w-5"
                          style={{ color: watchedValues.icon_color || "#374151" }}
                        />
                      ) : (
                        <span className="text-sm text-neutral-400">?</span>
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-medium capitalize transition-all">
                        {watchedValues.name || "Category Name"}
                      </p>
                      <p className="text-muted-foreground text-xs">0 Expense</p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Create Category"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  )
}

export default AddCategory
