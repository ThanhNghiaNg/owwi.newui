import { axiosInstance } from "../axios";
import { PartnerResponse } from "../types";

type AllPartnerResponse = PartnerResponse[]
export const getAllPartners = async (): Promise<AllPartnerResponse> => {
    return axiosInstance.get<AllPartnerResponse, any>('/v2/partners');
}

type BasePartner = {
    id: string;
    name: string;
    type: string;
    description?: string;
}

type CreatePartner = Omit<BasePartner, 'id'>
export const createPartner = async (partner: CreatePartner) => {
    return axiosInstance.post('/v2/partners', partner)
}

type UpdatePartner = BasePartner
export const updatePartner = async (partner: UpdatePartner) => {
    return axiosInstance.put(`/v2/partners/${partner.id}`, partner)
}

export const deletePartner = async (id: string) => {
    return axiosInstance.delete(`/v2/partners/${id}`)
}
