"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { PartnerFormData } from "./types"
import { PartnerModal } from "./partner-modal"
import { AxiosError } from "axios"

interface AddPartnerModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddPartnerModal({ isOpen, onClose }: AddPartnerModalProps) {
  const { mutateAsync: createPartner } = mutation.partner.create()
  const handleSubmit = async (formData: PartnerFormData, reset: () => void) => {
    await createPartner(formData, {
      onSuccess: () => {
        toast.success(MEMO_MESSAGE.CREATED_SUCCESS("Partner"))
        onClose()
        reset()
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data.message) {
          toast.error(error.response.data.message)
          return
        }
        console.error("Error adding partner:", error)
        toast.error(MEMO_MESSAGE.CREATED_FAILED("Partner"))
      }
    })

  }

  return (
    <PartnerModal title="Add new partner" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} enterLabel="Add Partner" />
  )
}
