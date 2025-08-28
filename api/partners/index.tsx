import { axiosInstance } from "../axios";
import { PartnerResponse } from "../types";

type AllPartnerResponse = PartnerResponse[]
export const getAllPartners = async (): Promise<AllPartnerResponse> => {
    return axiosInstance.get<AllPartnerResponse, any>('/partners');
}

type BasePartner = {
    id: string;
    name: string;
    type: string;
    description?: string;
}

type CreatePartner = Omit<BasePartner, 'id'>
export const createPartner = async (partner: CreatePartner) => {
    return axiosInstance.post('/partners', partner)
}

type UpdatePartner = BasePartner
export const updatePartner = async (partner: UpdatePartner) => {
    return axiosInstance.put(`/partners/${partner.id}`, partner)
}

export const deletePartner = async (id: string) => {
    return axiosInstance.delete(`/partners/${id}`)
}
