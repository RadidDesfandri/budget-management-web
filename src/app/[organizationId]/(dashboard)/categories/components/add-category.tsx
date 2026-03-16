"use client"

import { PermissionGuard } from "@/src/components/shared/permission-guard"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useAddCategory } from "../category.api"
import { CategoryInput } from "../category.type"
import { CategoryForm } from "./category-form"

const AddCategory = () => {
  const params = useParams()
  const organizationId = params.organizationId as string

  const { mutate, isPending, error } = useAddCategory(organizationId)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

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
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Add a new category to your organization.</DialogDescription>
          </DialogHeader>

          <CategoryForm
            mode="create"
            defaultValues={{
              name: "",
              icon: "",
              icon_color: "",
              background_color: ""
            }}
            isSubmitting={isPending}
            onCancel={() => setIsOpen(false)}
            onSubmit={(values: CategoryInput) => {
              mutate(values, {
                onSuccess: () => {
                  setIsOpen(false)
                }
              })
            }}
            fieldErrors={error?.fieldErrors}
          />
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  )
}

export default AddCategory
