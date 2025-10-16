"use client"

import { useCallback, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddTransactionModal } from "@/components/modals/add-transaction-modal"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { query } from "@/api/query"
import { formatDate } from "@/utils/formats/date"
import TableLoadMore from "@/components/table/pagination"
import { usePagination } from "@/components/table/usePagination"
import { EditTransactionModal } from "@/components/modals/edit-transaction-modal"
import { DeleteTransactionModal } from "@/components/modals/delete-transaction-modal"
// import { getTypeColor } from "@/utils/constants/styles"
import { DotLoader } from "@/components/ui/skeleton/dot-loader"
import { TransactionResponse } from "@/api/types"
import { EyeClosedIcon, EyeIcon, Pencil, PlusIcon, Search, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import TableFilter, { FilterOption } from "@/components/table/filter"

const tabs = ["All", "Revenue", "Expenses", "Loan", "Borrow"]

function TransactionsPage() {
  const [filters, setFilters] = useState<{ [key: string]: string | number | boolean }>({})

  const pagination = usePagination()
  const { limit, setLimit } = pagination

  const {
    data,
    fetchNextPage,
    isError,
    isFetching,
    isRefetching,
  } = useInfiniteQuery(query.transaction.getAllTransaction({ limit, filters }))

  const { data: partners = [], isFetching: isFetchingPartners } = useQuery(query.partner.getAll())
  const { data: categories = [], isFetching: isFetchingCategories } = useQuery(query.category.getAll())
  const { data: types = [], isFetching: isFetchingTypes } = useQuery(query.type.getAll())

  const isFetchingFilters = isFetchingPartners || isFetchingCategories || isFetchingTypes

  const [activeTab, setActiveTab] = useState("All")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [showSupportLine, setShowSupportLine] = useState(true)
  const [editTransaction, setEditTransaction] = useState<TransactionResponse | null>(null)
  const [deleteTransactionId, setDeleteTransactionId] = useState<string>("")

  const tableData = useMemo(() => data?.pages?.flatMap(page => page?.data) || [], [data?.pages])

  const filterOptions: FilterOption[] = useMemo(() => [

    {
      label: "Category", name: "category", type: "combobox", options: categories.map(c => ({ value: c._id, label: c.name }))
    },
    {
      label: "Partner", name: "partner", type: "combobox", options: partners.map(p => ({ value: p._id, label: p.name }))
    },
    {
      label: "Type", name: "type", type: "combobox", options: types.map(t => ({ value: t._id, label: t.name }))
    },
    {
      label: "Description", name: "description", type: "text"
    },
  ], [categories, partners, types])

  const onDeleteTransaction = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const transactionId = e.currentTarget.dataset.id
    if (!transactionId) return

    setDeleteTransactionId(transactionId)
  }, [])

  const onEditTransaction = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const transactionId = e.currentTarget.dataset.id
    if (!transactionId) return
    const transaction = tableData.find(t => t._id === transactionId)
    if (transaction) {
      setEditTransaction(transaction)
    }
  }, [tableData])

  const onDoubleClickRow = useCallback((e: React.MouseEvent<HTMLTableRowElement>) => {
    const transactionId = e.currentTarget.dataset.id
    if (!transactionId) return
    const transaction = tableData.find(t => t._id === transactionId)
    if (transaction) {
      setEditTransaction(transaction)
    }
  }, [tableData])

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

  let border = ""
  let totalOutcome = 0

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      {(isRefetching || isFetching) && <DotLoader />}
      <Header title="Transactions" breadcrumbs={[{ name: "Transactions" }]} />

      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex flex-col space-y-2 md:flex-row items-center md:space-x-2 md:space-y-0">
                <Button onClick={() => setShowSupportLine(prev => !prev)} title="Show support line">
                  <span className="mr-1 md:mr-2">{showSupportLine ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />}</span>
                  Support line
                </Button>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <span className="mr-1 md:mr-2"><PlusIcon size={18} /></span>
                  Transaction
                </Button>
              </div>

            </div>

            {/* Tabs */}
            {/* <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-fit">
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
            </div> */}
          </CardHeader>

          <CardContent>
            <TableFilter disableEnter={isFetchingFilters} className="relative mb-6" enterLabel="Search" filters={filters} setFilters={setFilters} filterOptions={filterOptions} />

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400 dark:border-gray-700">
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
                  {isError || !tableData ? null : tableData?.map((transaction, index) => {
                    border = index !== tableData.length - 1 && transaction.date !== tableData[index + 1].date ? "border-t border-gray-300 dark:border-gray-700" : ""
                    totalOutcome += transaction.type.name.toLowerCase() === "outcome" ? transaction.amount : 0
                    return (
                      <tr key={transaction._id} data-id={transaction._id} className={cn("border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white", showSupportLine && border)} onDoubleClick={onDoubleClickRow}>
                        <td className="py-3 px-4">{index}</td>
                        <td className="py-3 px-4">{transaction.category.name}</td>
                        <td className="py-3 px-4">{transaction.partner.name}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${getTypeColor(transaction.type.name)}`}>{transaction.type.name}</Badge>
                        </td>
                        <td className="py-3 px-4">{formatDate(transaction.date, "dd/mm/yyyy")}</td>
                        <td className="py-3 px-4">
                          {transaction.amount.toLocaleString()}đ
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" data-id={transaction._id} onClick={onEditTransaction}>
                              <span className="text-blue-600"><Pencil size={18} /></span>
                            </Button>
                            <Button variant="ghost" size="sm" data-id={transaction._id} onClick={onDeleteTransaction}>
                              <span className="text-red-600"><Trash2 size={18} /></span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  <tr className={cn("border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white", showSupportLine && border)}>
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4">
                          
                        </td>
                        <td className="py-3 px-4">Tổng chi:</td>
                        <td className="py-3 px-4">
                          {totalOutcome.toLocaleString()}đ
                        </td>
                        <td className="py-3 px-4">
                        </td>
                      </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data?.pages[data?.pages?.length-1].hasNextPage && <TableLoadMore fetchNextPage={fetchNextPage} isLoading={isFetching} setLimit={setLimit} defaultLimit={limit} />}
          </CardContent>
        </Card>
      </div>
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      {
        editTransaction &&
        <EditTransactionModal
          isOpen={!!editTransaction}
          onClose={() => setEditTransaction(null)}
          transaction={editTransaction}
        />
      }
      {
        deleteTransactionId &&
        <DeleteTransactionModal
          isOpen={!!deleteTransactionId}
          onClose={() => setDeleteTransactionId("")}
          id={deleteTransactionId}
        />
      }
    </div>
  )
}

export default TransactionsPage
