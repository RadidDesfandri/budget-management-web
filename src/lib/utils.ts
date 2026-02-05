import { AxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function isEmpty(value: unknown) {
  return value === "" || value === null || value === undefined
}

function isValidNumber(value?: string | number | null): boolean {
  // Handle null, undefined, empty or whitespace-only strings
  if (value === null || value === undefined) {
    return false
  }

  // If it's already a number, check if it's valid (not NaN and finite)
  if (typeof value === "number") {
    return !Number.isNaN(value) && Number.isFinite(value)
  }

  // Handle empty or whitespace-only strings
  if (value.trim() === "") {
    return false
  }

  // Remove leading/trailing whitespace
  const trimmed = value.trim()

  // Check if it's "Infinity" or "-Infinity"
  if (trimmed === "Infinity" || trimmed === "-Infinity") {
    return true
  }

  // Try parsing as a number and check if it's finite
  const num = Number(trimmed)

  // Check if it's a valid number and not NaN
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return false
  }

  // Additional check to prevent strings like "123abc" from being valid
  // by comparing the string representation of the parsed number
  // with the original trimmed string, accounting for scientific notation
  const numStr = num.toString()
  const originalNormalized = trimmed.toLowerCase().replace(/e-/g, "e-").replace(/e\+/g, "e")
  const parsedNormalized = numStr.toLowerCase().replace(/e-/g, "e-").replace(/e\+/g, "e")

  return originalNormalized === parsedNormalized
}

const normalizeApiError = (error: unknown) => {
  // Network / unknown error
  if (!(error instanceof AxiosError)) {
    return { message: "Network error" }
  }

  const data = error.response?.data
  if (!data) {
    return { message: "Network error" }
  }

  if (data.errors && typeof data.errors === "object") {
    const fieldErrors: Record<string, string> = {}

    Object.entries(data.errors).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        fieldErrors[key] = String(value[0])
      } else {
        fieldErrors[key] = String(value)
      }
    })

    return {
      message: data.message || "Validation Error",
      fieldErrors
    }
  }

  if (typeof data.message === "string") {
    return { message: data.message }
  }

  return { message: "Something went wrong" }
}

export { isEmpty, cn, isValidNumber, normalizeApiError }
