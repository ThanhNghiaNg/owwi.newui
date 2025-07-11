"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { CategoryModal } from "./category-modal"
import { CategoryFormData } from "./types"
import { TODAY } from "@/utils/constants/variables"
import { formatDate } from "@/utils/formats/date"
import { CategoryResponse } from "@/api/types"
import { AxiosError } from "axios"

interface EditCategoryModalProps {
  isOpen: boolean,
  category: CategoryResponse,
  onClose: () => void
}

export function EditCategoryModal({ isOpen, category, onClose }: EditCategoryModalProps) {
  const { mutateAsync: updateCategories, isPending } = mutation.category.update()
  const handleSubmit = async (formData: CategoryFormData, reset: () => void) => {
    await updateCategories({
      id: category._id,
      ...formData
    }, {
      onSuccess: (data) => {
        toast.success(MEMO_MESSAGE.UPDATED_SUCCESS("Category"))
        onClose()
        reset()
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data.message) {
          toast.error(error.response.data.message)
          return
        }
        console.error("Error adding category:", error)
        toast.error(MEMO_MESSAGE.UPDATED_FAILED("Category"))
      }
    })

  }

  const initFormData: CategoryFormData = {
    name: category.name,
    type: category.type._id,
    description: category.description || "",
  }

  return (
    <CategoryModal
      title="Edit category"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      enterLabel="Update Category"
      initFormData={initFormData}
      isLoading={isPending}
    />
  )
}
