"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const colorOptions = [
  { value: "#10B981", label: "🟢 Green" },
  { value: "#F59E0B", label: "🟡 Yellow" },
  { value: "#EF4444", label: "🔴 Red" },
  { value: "#8B5CF6", label: "🟣 Purple" },
  { value: "#3B82F6", label: "🔵 Blue" },
  { value: "#F97316", label: "🟠 Orange" },
  { value: "#EC4899", label: "🩷 Pink" },
  { value: "#6B7280", label: "⚫ Gray" },
]

const typeOptions = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
  { value: "loan", label: "Loan" },
  { value: "borrow", label: "Borrow" },
]

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    color: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Category data:", formData)
    onClose()
    setFormData({
      name: "",
      type: "",
      description: "",
      color: "",
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category Name *</label>
          <Input
            placeholder="Enter category name"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color *</label>
          <Select
            options={colorOptions}
            value={formData.color}
            onChange={(value) => setFormData({ ...formData, color: value })}
            placeholder="Select color"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <Textarea
            placeholder="Add a description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Add Category
          </Button>
        </div>
      </form>
    </Modal>
  )
}
