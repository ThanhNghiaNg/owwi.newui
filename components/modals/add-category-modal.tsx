"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { CategoryFormData } from "./types"
import { AxiosError } from "axios"
import { CategoryModal } from "./category-modal"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const { mutateAsync: createCategory } = mutation.category.create()
  const handleSubmit = async (formData: CategoryFormData, reset: () => void) => {
    await createCategory(formData, {
      onSuccess: () => {
        toast.success(MEMO_MESSAGE.CREATED_SUCCESS("Category"))
        onClose()
        reset()
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data.message) {
          toast.error(error.response.data.message)
          return
        }
        console.error("Error adding category:", error)
        toast.error(MEMO_MESSAGE.CREATED_FAILED("Category"))
      }
    })

  }

  return (
    <CategoryModal title="Add new category" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} enterLabel="Add Category" />
  )
}
