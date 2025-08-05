'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { query } from "@/api/query"
import { DoubleBarChart } from "../charts/double-bar-chart"
import { useState } from "react"
import { BarChart } from "../charts/bar-chart"

type SelectionPeriod = "weekly" | "monthly" | "yearly"

export function ExpenseChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<SelectionPeriod>("weekly")
  const { data: weekly } = useQuery(query.transaction.statistic.weekly())
  const { data: monthly } = useQuery(query.transaction.statistic.monthly())
  const { datasets: datasetsWeekly = [], labels: labelsWeekly = [] } = weekly || {}

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex justify-between">
          <p>{selectedPeriod === "monthly" ? "Monthly" : 'Weekly'} Expenses</p>
          <select
            onChange={(e) => { setSelectedPeriod(e.target.value as SelectionPeriod) }}
            defaultValue="weekly"
            className="text-sm text-gray-500 dark:text-gray-400 bg-transparent border border-gray-300 dark:border-gray-700 rounded px-0 py-1"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            {/* <option value="yearly">Yearly</option> */}
          </select>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Expense comparison over recent {selectedPeriod === "monthly" ? "monthly" : 'weekly'}</p>
      </CardHeader>
      <CardContent className="p-6 px-0 pt-0 relative">
        <div className="h-[250px] sm:h-[300px] w-full relative -left-4">
          {selectedPeriod === "weekly" && <DoubleBarChart datasets={datasetsWeekly} labels={labelsWeekly} height={280} color="#7DD3FC" tooltipId="weekly-bar-chart"/>}
          {selectedPeriod === "monthly" && monthly && <BarChart data={monthly} height={280} color="#7DD3FC" tooltipId="monthly-bar-chart"/>}
        </div>
      </CardContent>
    </Card>
  )
}
