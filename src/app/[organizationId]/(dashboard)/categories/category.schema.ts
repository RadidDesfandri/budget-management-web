import * as z from "zod"

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),
  icon: z.string().min(1, "Icon must be at least 1 character long"),
  icon_color: z.string().min(7, "Icon color must be a valid hex color"),
  background_color: z.string().min(7, "Background color must be a valid hex color")
})

export { categorySchema }
