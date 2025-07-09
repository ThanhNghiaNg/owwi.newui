"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "@/components/charts/pie-chart"

const categoryData = [
  { name: "Food", value: 2400, color: "#A7F3D0" },
  { name: "Transport", value: 1200, color: "#FBBF24" },
  { name: "Entertainment", value: 800, color: "#C4B5FD" },
  { name: "Shopping", value: 1500, color: "#F9A8D4" },
  { name: "Bills", value: 900, color: "#7DD3FC" },
]

export function CategoryPieChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Expense Categories</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Current month breakdown by category</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-[250px] sm:h-[300px] w-full flex justify-center">
          <PieChart data={categoryData} size={280} />
        </div>
      </CardContent>
    </Card>
  )
}
