"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

interface AddPartnerModalProps {
  isOpen: boolean
  onClose: () => void
}

const typeOptions = [
  { value: "person", label: "👤 Person" },
  { value: "company", label: "🏢 Company" },
]

export function AddPartnerModal({ isOpen, onClose }: AddPartnerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Partner data:", formData)
    onClose()
    setFormData({
      name: "",
      type: "",
      email: "",
      phone: "",
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Partner">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Partner Name *</label>
          <Input
            placeholder="Enter partner name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type *</label>
          <Select
            options={typeOptions}
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
            placeholder="Select type"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <Input
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Add Partner
          </Button>
        </div>
      </form>
    </Modal>
  )
}
