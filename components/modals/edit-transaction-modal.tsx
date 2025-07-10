"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { TransactionModal } from "./transaction-modal"
import { TransactionFormData } from "./types"
import { TransactionResponse } from "@/api/transaction"
import { TODAY } from "@/utils/constants/variables"
import { formatDate } from "@/utils/formats/date"

interface EditTransactionModalProps {
  isOpen: boolean,
  transaction: TransactionResponse,
  onClose: () => void
}

export function EditTransactionModal({ isOpen, transaction, onClose }: EditTransactionModalProps) {
  const { mutateAsync: updateTransactions, isPending } = mutation.transactions.updateTransactions()
  const handleSubmit = async (formData: TransactionFormData, reset: () => void) => {
    await updateTransactions({
      _id: transaction._id,
      ...formData
    }, {
      onSuccess: (data) => {
        toast.success(MEMO_MESSAGE.UPDATED_SUCCESS("Transaction"))
        onClose()
        reset()
      },
      onError: (error) => {
        console.error("Error adding transaction:", error)
        toast.error(MEMO_MESSAGE.UPDATED_FAILED("Transaction"))
      }
    })

  }

  const initFormData: TransactionFormData = {
    type: transaction.type._id,
    category: transaction.category._id,
    partner: transaction.partner._id,
    amount: transaction.amount.toString(),
    description: transaction.description || "",
    isDone: transaction.isDone,
    date: transaction.date ? formatDate(transaction.date, "yyyy/MM/dd", '-') : TODAY // Default to today if no date
  }

  return (
    <TransactionModal
      title="Edit transaction"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      enterLabel="Update Transaction"
      initFormData={initFormData}
      isLoading={isPending}
    />
  )
}
