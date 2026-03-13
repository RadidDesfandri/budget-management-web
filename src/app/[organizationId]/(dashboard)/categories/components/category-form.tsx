"use client"

import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { cn } from "@/src/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BACKGROUND_COLORS, CATEGORY_ICONS, ICON_COLORS } from "../category.config"
import { categorySchema } from "../category.schema"
import { CategoryInput } from "../category.type"
import ColorSwatch from "./color-swatch"
import { useEffect } from "react"

export interface CategoryFormProps {
  mode: "create" | "edit"
  defaultValues: CategoryInput
  isSubmitting?: boolean
  onSubmit: (values: CategoryInput) => void
  onCancel?: () => void
  fieldErrors?: Record<string, string>
}

export const CategoryForm = ({
  mode,
  defaultValues,
  isSubmitting = false,
  onSubmit,
  onCancel,
  fieldErrors
}: CategoryFormProps) => {
  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues
  })

  const watchedValues = form.watch()

  const selectedIconObj = CATEGORY_ICONS.find((i) => i.value === watchedValues.icon)
  const SelectedIcon = selectedIconObj?.icon

  useEffect(() => {
    if (!fieldErrors || !form) return
    Object.entries(fieldErrors).forEach(([key, message]) => {
      form.setError(key as keyof CategoryInput, { type: "server", message })
    })
  }, [fieldErrors, form])

  const handleSubmit = (values: CategoryInput) => {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                    disabled={isSubmitting}
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
                    <input type="hidden" {...field} value={field.value ?? ""} />
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
                    <input type="hidden" {...field} value={field.value ?? ""} />
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
            <p className="text-muted-foreground text-xs font-medium uppercase">Live Preview</p>
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

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" disabled={isSubmitting} onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "create"
                ? "Saving..."
                : "Updating..."
              : mode === "create"
                ? "Create Category"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
