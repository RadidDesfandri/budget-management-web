"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { useState } from "react"
import { useUpdateCategory } from "../category.api"
import { Category, CategoryInput } from "../category.type"
import { CategoryForm, CategoryFormProps } from "./category-form"

interface CategoryEditDialogProps {
  category: Category
  trigger: React.ReactNode
}

export function CategoryEditDialog({ category, trigger }: CategoryEditDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending, error } = useUpdateCategory(
    String(category.organization_id),
    category.id
  )

  const defaultValues: CategoryInput = {
    name: category.name,
    icon: category.icon,
    icon_color: category.icon_color ?? "",
    background_color: category.background_color ?? ""
  }

  const handleSubmit: CategoryFormProps["onSubmit"] = (values) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update this category&apos;s details.</DialogDescription>
        </DialogHeader>

        <CategoryForm
          mode="edit"
          defaultValues={defaultValues}
          isSubmitting={isPending}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
          fieldErrors={error?.fieldErrors}
        />
      </DialogContent>
    </Dialog>
  )
}
