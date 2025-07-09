import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/charts/bar-chart"

const monthlyExpenses = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 2800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 2800 },
  { name: "Jun", value: 3200 },
  { name: "Jul", value: 2900 },
  { name: "Aug", value: 3100 },
]

export function ExpenseChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Expenses</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Expense comparison over recent months</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-[250px] sm:h-[300px] w-full">
          <BarChart data={monthlyExpenses} height={300} color="#7DD3FC" />
        </div>
      </CardContent>
    </Card>
  )
}
