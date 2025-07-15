"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "@/components/charts/pie-chart"
import { useQuery } from "@tanstack/react-query"
import { query } from "@/api/query"
import { useMemo, useState } from "react"
import { PASTEL_COLORS } from "@/utils/constants/variables"

const categoryData = [
  { name: "Food", value: 2400, color: "#A7F3D0" },
  { name: "Transport", value: 1200, color: "#FBBF24" },
  { name: "Entertainment", value: 800, color: "#C4B5FD" },
  { name: "Shopping", value: 1500, color: "#F9A8D4" },
  { name: "Bills", value: 900, color: "#7DD3FC" },
]

export function CategoryPieChart() {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const { data = [] } = useQuery(query.transaction.statistic.month(month))
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), [])
  const transformData = useMemo(() => data?.map((item, index) => ({ name: item.name, value: item.totalAmount, color: PASTEL_COLORS[index % PASTEL_COLORS.length] })), [data])

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex justify-between">
          <p>Expense Categories</p>
          <select
            onChange={(e) => { setMonth(Number(e.target.value)) }}
            defaultValue={month}
            className="text-sm text-gray-500 dark:text-gray-400 bg-transparent border border-gray-300 dark:border-gray-700 rounded px-0 py-1"
          >
            {months.map((m) => <option key={m} value={m}>Tháng {m}</option>)}
          </select>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Month outcome breakdown by category</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="w-full flex justify-center">
          <PieChart data={transformData} size={260} />
        </div>
      </CardContent>
    </Card>
  )
}
