'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { query } from "@/api/query"
import { DoubleBarChart } from "../charts/double-bar-chart"

export function ExpenseChart() {
  const { data: weekly } = useQuery(query.transaction.statistic.weekly())
  const { datasets = [], labels = [] } = weekly || {}

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Expenses</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Expense comparison over recent weekly</p>
      </CardHeader>
      <CardContent className="p-6 px-0 pt-0 relative">
        <div className="h-[250px] sm:h-[300px] w-full relative -left-4">
          <DoubleBarChart datasets={datasets} labels={labels} height={280} color="#7DD3FC" />
        </div>
      </CardContent>
    </Card>
  )
}
