import type { Transaction, Category, Partner } from "./types"

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 3000,
    type: "income",
    category: "Salary",
    partner: "Company ABC",
    date: "2024-01-23",
    wallet: "Cash",
    description: "Monthly salary",
  },
  {
    id: "2",
    amount: 22222,
    type: "loan",
    category: "Personal Loan",
    partner: "John Doe",
    date: "2024-01-23",
    wallet: "Cash",
    description: "Emergency loan",
  },
  {
    id: "3",
    amount: 500,
    type: "expense",
    category: "Food",
    partner: "Restaurant XYZ",
    date: "2024-01-22",
    wallet: "Card",
    description: "Dinner",
  },
]

export const mockCategories: Category[] = [
  { id: "1", name: "Salary", type: "income", description: "Monthly income", color: "#10B981" },
  { id: "2", name: "Food", type: "expense", description: "Food and dining", color: "#F59E0B" },
  { id: "3", name: "Transport", type: "expense", description: "Transportation costs", color: "#EF4444" },
  { id: "4", name: "Personal Loan", type: "loan", description: "Money lent to others", color: "#8B5CF6" },
]

export const mockPartners: Partner[] = [
  { id: "1", name: "Company ABC", email: "hr@companyabc.com", type: "company" },
  { id: "2", name: "John Doe", email: "john@email.com", phone: "+84123456789", type: "person" },
  { id: "3", name: "Restaurant XYZ", type: "company" },
]
