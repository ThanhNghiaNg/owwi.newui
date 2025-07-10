"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { TransactionModal } from "./transaction-modal"
import { TransactionFormData } from "./types"

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { mutateAsync: createTransaction } = mutation.transactions.createTransactions()
  const handleSubmit = async (formData: TransactionFormData, reset: () => void) => {
    await createTransaction(formData, {
      onSuccess: () => {
        toast.success(MEMO_MESSAGE.CREATED_SUCCESS("Transaction"))
        onClose()
        reset()
      },
      onError: (error) => {
        console.error("Error adding transaction:", error)
        toast.error(MEMO_MESSAGE.CREATED_FAILED("Transaction"))
      }
    })

  }

  return (
    <TransactionModal title="Add new transaction" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} enterLabel="Add Transaction" />
  )
}
