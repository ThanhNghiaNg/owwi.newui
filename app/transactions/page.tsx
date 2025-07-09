"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddTransactionModal } from "@/components/modals/add-transaction-modal"
import { useInfiniteQuery } from "@tanstack/react-query"
import { query } from "@/api/query"
import { formatDate } from "@/utils/formats/date"
import TableLoadMore from "@/components/table/pagination"
import { usePagination } from "@/components/table/usePagination"

const tabs = ["All", "Revenue", "Expenses", "Loan", "Borrow"]

function TransactionsPage() {
  const pagination = usePagination()
  const { cursor, limit, setCursor, setLimit } = pagination
  // const { data: transactions, isError, isSuccess } = useQuery(query.transaction.getAll({ page: currentPage, pageSize }))
  const {
    data,
    fetchNextPage,
    isError,
    isFetching,
  } = useInfiniteQuery(query.transaction.getAllTransaction({ limit }))

  const [activeTab, setActiveTab] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "income":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "outcome":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "loan":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "borrow":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const pages = data?.pages
  const tableData = pages?.flatMap(page => page.data) || []

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Header title="Transactions" breadcrumbs={[{ name: "Transactions" }]} />

      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <span className="mr-2">➕</span>
                Add Transaction
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === tab
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {/* Search */}
            <div className="relative mb-6">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">No</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Partner</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isError || !tableData ? null : tableData?.map((transaction, index) => (
                    <tr key={transaction._id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{index}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.category.name}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.partner.name}</td>
                      <td className="py-3 px-4">
                        <Badge className={getTypeColor(transaction.type.name)}>{transaction.type.name}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{formatDate(transaction.date, "dd/mm/yyyy")}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {transaction.amount.toLocaleString()}đ
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <span className="text-blue-600">✏️</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <span className="text-red-600">🗑️</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <TableLoadMore fetchNextPage={fetchNextPage} isLoading={isFetching} setLimit={setLimit} defaultLimit={limit} />
          </CardContent>
        </Card>
      </div>
      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}

export default TransactionsPage
