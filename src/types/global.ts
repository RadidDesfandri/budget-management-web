interface Dropdown {
  id: number
  text: string
}

interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
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
