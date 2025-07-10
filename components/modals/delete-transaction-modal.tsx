"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { DeleteModal } from "./delete-modal"

interface DeleteTransactionModalProps {
  isOpen: boolean,
  id: string,
  onClose: () => void
}

export function DeleteTransactionModal({ isOpen, id, onClose }: DeleteTransactionModalProps) {
  const { mutateAsync: deleteTransactions, isPending } = mutation.transactions.deleteTransactions()
  const handleSubmit = async () => {
    await deleteTransactions(id, {
      onSuccess: (data) => {
        toast.success(MEMO_MESSAGE.DELETED_SUCCESS("Transaction"))
        onClose()
      },
      onError: (error) => {
        console.error("Error adding transaction:", error)
        toast.error(MEMO_MESSAGE.DELETED_FAILED("Transaction"))
      }
    })

  }

  return (
    <DeleteModal
      title="Delete transaction"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      enterLabel="Delete Transaction"
      isLoading={isPending}
      content={<div className="text-center">Are you sure you want to delete this transaction?<br /> This action cannot be undone.</div>}
    />
  )
}
