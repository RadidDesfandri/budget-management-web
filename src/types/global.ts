interface Dropdown {
  id: number
  text: string
}

interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

interface QueryParams {
  page?: number
  page_size?: number
  search?: string
  sort_by?: string
  order_by?: "asc" | "desc"
}

export type { Dropdown, PaginatedResponse, QueryParams }
