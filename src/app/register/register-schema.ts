import * as z from "zod"

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email format is invalid" }),
    name: z.string().min(1, { message: "Fullname is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(30, { message: "Password must be at most 30 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(30, { message: "Password must be at most 30 characters" }),
    terms: z.boolean().refine((value) => value, {
      message: "You must accept the terms and conditions."
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })
