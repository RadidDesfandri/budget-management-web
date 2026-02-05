type ValidationError = Record<string, string[]>

type ApiResponse<T> =
  | {
      success: true
      message: string
      statusCode: number
      data: T
      error: null
      errors?: null
    }
  | {
      success: false
      message: string
      statusCode: number
      data: null
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error?: any
      errors: ValidationError
    }

type ApiError = {
  message: string
  fieldErrors?: Record<string, string>
}

export type { ApiResponse, ValidationError, ApiError }
