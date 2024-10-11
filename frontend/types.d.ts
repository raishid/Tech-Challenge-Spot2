export interface Acortado {
  id: string
  url: string
  code: string
  visits: number
  created_at: string
}

export interface AcortadoResponse {
  data: Acortado[]
  links: {
    next: string | null
    previous: string | null
    page: number
    total: number
    per_page: number
  },
  isLoading: boolean
  exception?: string
}