"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Combobox } from "@/components/ui/combobox"
import { mockCategories, mockPartners } from "@/lib/data"

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    partner: "",
    date: "",
    wallet: "",
    description: "",
  })

  const categoryOptions = mockCategories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }))

  const partnerOptions = mockPartners.map((partner) => ({
    value: partner.id,
    label: partner.name,
  }))

  const typeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
    { value: "loan", label: "Loan" },
    { value: "borrow", label: "Borrow" },
  ]

  const walletOptions = [
    { value: "cash", label: "Cash" },
    { value: "card", label: "Card" },
    { value: "bank", label: "Bank" },
    { value: "digital", label: "Digital Wallet" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Transaction data:", formData)
    onClose()
    setFormData({
      amount: "",
      type: "",
      category: "",
      partner: "",
      date: "",
      wallet: "",
      description: "",
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Transaction">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount *</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
          <Combobox
            options={categoryOptions}
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            placeholder="Select or search category..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Partner *</label>
          <Combobox
            options={partnerOptions}
            value={formData.partner}
            onChange={(value) => setFormData({ ...formData, partner: value })}
            placeholder="Select or search partner..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date *</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Wallet *</label>
            <Select
              options={walletOptions}
              value={formData.wallet}
              onChange={(value) => setFormData({ ...formData, wallet: value })}
              placeholder="Select wallet"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <Textarea
            placeholder="Add a note..."
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
            Add Transaction
          </Button>
        </div>
      </form>
    </Modal>
  )
}
