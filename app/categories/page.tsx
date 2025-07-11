"use client"

import { useCallback, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddCategoryModal } from "@/components/modals/add-category-modal"
import { useQuery } from "@tanstack/react-query"
import { query } from "@/api/query"
import { getTypeColor } from "@/utils/constants/styles"
import { DotLoader } from "@/components/ui/skeleton/dot-loader"
import { CategoryResponse } from "@/api/types"
import { EditCategoryModal } from "@/components/modals/edit-category-modal"
import { DeleteCategoryModal } from "@/components/modals/delete-category-modal"

export default function CategoriesPage() {
  const { data: categories = [], isRefetching } = useQuery(query.category.getAll())
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editCategory, setEditCategory] = useState<CategoryResponse | null>(null)
  const [deleteCategoryId, setDeleteCategoryId] = useState("")

  const onDeleteCategory = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryId = e.currentTarget.dataset.id
    if (!categoryId) return

    setDeleteCategoryId(categoryId)
  }, [])

  const onEditCategory = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryId = e.currentTarget.dataset.id
    if (!categoryId) return
    const category = categories.find(t => t._id === categoryId)
    if (category) {
      setEditCategory(category)
    }
  }, [categories])

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <DotLoader isShow={isRefetching} />
      <Header title="Categories" breadcrumbs={[{ name: "Categories" }]} />
      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Categories</CardTitle>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <span className="mr-2">➕</span>
                Add new Category
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Search */}
            <div className="relative mb-6">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <Input
                placeholder="Search categories..."
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
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category._id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-sm">{category.type.name === "company" ? "🏢" : "👤"}</span>
                          </div>
                          <span className="text-gray-900 dark:text-white">{category.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getTypeColor(category.type.name)}>{category.type.name}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        {category.description}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" data-id={category._id} onClick={onEditCategory}>
                            <span className="text-blue-600">✏️</span>
                          </Button>
                          <Button variant="ghost" size="sm" data-id={category._id} onClick={onDeleteCategory}>
                            <span className="text-red-600">🗑️</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      {
        editCategory &&
        <EditCategoryModal
          isOpen={!!editCategory}
          onClose={() => setEditCategory(null)}
          category={editCategory}
        />
      }
      {
        deleteCategoryId &&
        <DeleteCategoryModal
          isOpen={!!deleteCategoryId}
          onClose={() => setDeleteCategoryId("")}
          id={deleteCategoryId}
        />
      }
    </div>
  )
}
