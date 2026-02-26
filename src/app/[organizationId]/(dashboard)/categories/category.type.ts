import * as z from "zod"
import { categorySchema } from "./category.schema"

interface Category {
  id: number
  organization_id: number
  name: string
  icon: string
  icon_color: string | null
  background_color: string | null
  created_at: string
  updated_at: string
}

type CategoryInput = z.infer<typeof categorySchema>

export type { Category, CategoryInput }
