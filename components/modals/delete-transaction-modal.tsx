"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { DeleteModal } from "./delete-modal"
import { AxiosError } from "axios"

interface DeleteTransactionModalProps {
  isOpen: boolean,
  id: string,
  onClose: () => void,
  queryKey?: object
}

export function DeleteTransactionModal({ isOpen, id, onClose, queryKey }: DeleteTransactionModalProps) {
  const { mutateAsync: deleteTransactions, isPending } = mutation.transaction.delete(queryKey)
  const handleSubmit = async () => {
    await deleteTransactions(id, {
      onSuccess: (data) => {
        toast.success(MEMO_MESSAGE.DELETED_SUCCESS("Transaction"))
        onClose()
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data.message) {
          toast.error(error.response.data.message)
          return
        }
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
