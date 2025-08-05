"use client"

import { useCallback, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddPartnerModal } from "@/components/modals/add-partner-modal"
import { useQuery } from "@tanstack/react-query"
import { query } from "@/api/query"
import { getTypeColor } from "@/utils/constants/styles"
import { DotLoader } from "@/components/ui/skeleton/dot-loader"
import { DeletePartnerModal } from "@/components/modals/delete-partner-modal"
import { EditPartnerModal } from "@/components/modals/edit-partner-modal"
import { PartnerResponse } from "@/api/types"
import { User } from "lucide-react"

export default function PartnersPage() {
  const { data: partners = [], isRefetching } = useQuery(query.partner.getAll())
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editPartner, setEditPartner] = useState<PartnerResponse | null>(null)
  const [deletePartnerId, setDeletePartnerId] = useState("")

  const onDeletePartner = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const partnerId = e.currentTarget.dataset.id
    if (!partnerId) return

    setDeletePartnerId(partnerId)
  }, [])

  const onEditPartner = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const partnerId = e.currentTarget.dataset.id
    if (!partnerId) return
    const partner = partners.find(t => t._id === partnerId)
    if (partner) {
      setEditPartner(partner)
    }
  }, [partners])

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <DotLoader isShow={isRefetching} />
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
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((partner, index) => (
                    <tr key={partner._id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-sm">{partner.type.name === "company" ? "🏢" : <User />}</span>
                          </div>
                          <span className="text-gray-900 dark:text-white">{partner.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getTypeColor(partner.type.name)}>{partner.type.name}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        {partner.description}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" data-id={partner._id} onClick={onEditPartner}>
                            <span className="text-blue-600">✏️</span>
                          </Button>
                          <Button variant="ghost" size="sm" data-id={partner._id} onClick={onDeletePartner}>
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
      <AddPartnerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      {
        editPartner &&
        <EditPartnerModal
          isOpen={!!editPartner}
          onClose={() => setEditPartner(null)}
          partner={editPartner}
        />
      }
      {
        deletePartnerId &&
        <DeletePartnerModal
          isOpen={!!deletePartnerId}
          onClose={() => setDeletePartnerId("")}
          id={deletePartnerId}
        />
      }
    </div>
  )
}
