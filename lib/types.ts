export interface Transaction {
  id: string
  amount: number
  type: "income" | "expense" | "loan" | "borrow"
  category: string
  partner: string
  date: string
  description?: string
}

export interface Category {
  id: string
  name: string
  type: "income" | "expense" | "loan" | "borrow"
  description?: string
  color: string
}

export interface Partner {
  id: string
  name: string
  email?: string
  phone?: string
  type: "person" | "company"
}

export interface ChartData {
  name: string
  value: number
  color?: string
}
