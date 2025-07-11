"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { DeleteModal } from "./delete-modal"
import { AxiosError } from "axios"

interface DeleteCategoryModalProps {
  isOpen: boolean,
  id: string,
  onClose: () => void
}

export function DeleteCategoryModal({ isOpen, id, onClose }: DeleteCategoryModalProps) {
  const { mutateAsync: deleteCategories, isPending } = mutation.category.delete()
  const handleSubmit = async () => {
    await deleteCategories(id, {
      onSuccess: (data) => {
        toast.success(MEMO_MESSAGE.DELETED_SUCCESS("Category"))
        onClose()
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data.message) {
          toast.error(error.response.data.message)
          return
        }
        console.error("Error deleting category:", error)
        toast.error(MEMO_MESSAGE.DELETED_FAILED("Category"))
      }
    })

  }

  return (
    <DeleteModal
      title="Delete category"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      enterLabel="Delete Category"
      isLoading={isPending}
      content={<div className="text-center">Are you sure you want to delete this category?<br /> This action cannot be undone.</div>}
    />
  )
}
