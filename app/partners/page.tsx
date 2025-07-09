"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPartners } from "@/lib/data"
import { AddPartnerModal } from "@/components/modals/add-partner-modal"

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Header title="Partners" breadcrumbs={[{ name: "Partners" }]} />

      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Partners</CardTitle>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <span className="mr-2">➕</span>
                Add new Partner
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Search */}
            <div className="relative mb-6">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <Input
                placeholder="Search partners..."
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
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPartners.map((partner, index) => (
                    <tr key={partner.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-sm">{partner.type === "company" ? "🏢" : "👤"}</span>
                          </div>
                          <span className="text-gray-900 dark:text-white">{partner.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            partner.type === "company"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          }
                        >
                          {partner.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{partner.email || "-"}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{partner.phone || "-"}</td>
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
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">Page Size: 10 | 1 of 1</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <AddPartnerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
