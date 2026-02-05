import { isEmpty, isValidNumber } from "./utils"
import * as z from "zod"

const requiredStringSchema = z.string().min(1)
const nullableStringSchema = z
  .string()
  .nullish()
  .transform((value) => {
    if (isEmpty(value)) {
      return null
    }

    return value
  })

const requiredDateTimeSchema = z.string().datetime()
const nullableDateTimeSchema = z
  .string()
  .nullish()
  .transform((value) => {
    if (isEmpty(value)) {
      return null
    }

    return value
  })
  .pipe(z.string().datetime().nullable())

const requiredDateSchema = z.string().date()
const nullableDateSchema = z
  .string()
  .nullish()
  .transform((value) => {
    if (isEmpty(value)) {
      return null
    }

    return value
  })
  .pipe(z.string().date().nullable())

const requiredEmailSchema = z.string().email()
const nullableEmailSchema = z
  .string()
  .nullish()
  .transform((value) => {
    if (isEmpty(value)) {
      return null
    }

    return value
  })
  .pipe(z.string().email().nullable())

const requiredNumberSchema = z
  .union([z.string(), z.number()])
  .transform((value) => {
    return typeof value === "number" ? value : +value
  })
  .pipe(z.number())
const nullableNumberSchema = z
  .union([z.string(), z.number()])
  .nullish()
  .transform((value) => {
    if (isEmpty(value)) {
      return null
    }

    if (!isValidNumber(value)) {
      return null
    }

    return typeof value === "number" ? value : +value
  })
  .pipe(z.number().nullable())

function requiredEnumSchema<U extends string, T extends Readonly<[U, ...U[]]>>(arr: T) {
  return z.enum(arr, { message: "Field ini wajib disi" })
}

function nullableEnumSchema<U extends string, T extends Readonly<[U, ...U[]]>>(arr: T) {
  return z
    .string()
    .nullish()
    .transform((value) => {
      if (isEmpty(value)) {
        return null
      }

      return value
    })
    .pipe(z.enum(arr).nullable())
}

export {
  requiredStringSchema,
  nullableStringSchema,
  requiredDateTimeSchema,
  nullableDateTimeSchema,
  requiredDateSchema,
  nullableDateSchema,
  requiredEmailSchema,
  nullableEmailSchema,
  requiredNumberSchema,
  nullableNumberSchema,
  requiredEnumSchema,
  nullableEnumSchema
}
