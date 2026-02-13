import * as z from "zod"

const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, "Organization name is required")
    .min(3, "Organization name must be at least 3 characters"),
  logo: z.instanceof(File).optional().nullable()
})

export { createOrganizationSchema }
