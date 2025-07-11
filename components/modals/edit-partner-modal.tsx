"use client"

import type React from "react"

import { mutation } from "@/api/mutate"
import toast from "react-hot-toast"
import { MEMO_MESSAGE } from "@/utils/constants/memo-messsage"
import { PartnerModal } from "./partner-modal"
import { PartnerFormData } from "./types"
import { TODAY } from "@/utils/constants/variables"
import { formatDate } from "@/utils/formats/date"
import { PartnerResponse } from "@/api/types"
import { AxiosError } from "axios"

interface EditPartnerModalProps {
  isOpen: boolean,
  partner: PartnerResponse,
  onClose: () => void
}

export function EditPartnerModal({ isOpen, partner, onClose }: EditPartnerModalProps) {
  const { mutateAsync: updatePartners, isPending } = mutation.partner.update()
  const handleSubmit = async (formData: PartnerFormData, reset: () => void) => {
    await updatePartners({
      id: partner._id,
      ...formData
    }, {
      onSuccess: (data) => {
        toast.success(MEMO_MESSAGE.UPDATED_SUCCESS("Partner"))
        onClose()
        reset()
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data.message) {
          toast.error(error.response.data.message)
          return
        }
        console.error("Error adding partner:", error)
        toast.error(MEMO_MESSAGE.UPDATED_FAILED("Partner"))
      }
    })

  }

  const initFormData: PartnerFormData = {
    name: partner.name,
    type: partner.type._id,
    description: partner.description || "",
  }

  return (
    <PartnerModal
      title="Edit partner"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      enterLabel="Update Partner"
      initFormData={initFormData}
      isLoading={isPending}
    />
  )
}
