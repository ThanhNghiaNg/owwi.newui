import { Header } from "@/components/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart"

export default function Dashboard() {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header title="Dashboard" />
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <StatsCards />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
          <ExpenseChart />
          <CategoryPieChart />
        </div>
      </div>
    </div>
  )
}
