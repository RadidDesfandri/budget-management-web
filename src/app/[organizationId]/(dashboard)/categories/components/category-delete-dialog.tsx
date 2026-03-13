"use client"

import { Button } from "@/src/components/ui/button"
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
import { useDeleteCategory } from "../category.api"
import { Category } from "../category.type"

interface CategoryDeleteDialogProps {
  category: Category
  trigger: React.ReactNode
}

export function CategoryDeleteDialog({ category, trigger }: CategoryDeleteDialogProps) {
  const { mutate: deleteCategory, isPending } = useDeleteCategory(String(category.organization_id))

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the category{" "}
            <span className="font-semibold">{category.name}</span> and remove it from your
            organization.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => deleteCategory(category.id)}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
