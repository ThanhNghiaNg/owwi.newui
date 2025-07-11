"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { DeleteModal } from "./delete-modal"
import { AxiosError } from "axios"

interface DeletePartnerModalProps {
  isOpen: boolean,
  id: string,
  onClose: () => void
}

export function DeletePartnerModal({ isOpen, id, onClose }: DeletePartnerModalProps) {
  const { mutateAsync: deletePartners, isPending } = mutation.partner.delete()
  const handleSubmit = async () => {
    await deletePartners(id, {
      onSuccess: (data) => {
        toast.success(MEMO_MESSAGE.DELETED_SUCCESS("Partner"))
        onClose()
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data.message) {
          toast.error(error.response.data.message)
          return
        }
        console.error("Error deleting partner:", error)
        toast.error(MEMO_MESSAGE.DELETED_FAILED("Partner"))
      }
    })

  }

  return (
    <DeleteModal
      title="Delete partner"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      enterLabel="Delete Partner"
      isLoading={isPending}
      content={<div className="text-center">Are you sure you want to delete this partner?<br /> This action cannot be undone.</div>}
    />
  )
}
