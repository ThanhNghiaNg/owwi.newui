import { axiosInstance } from "../axios";

type Partner = {
    _id: string;
    name: string;
    description?: string;
}


type AllPartnerResponse = Partner[]
export const getAllPartners = async (): Promise<AllPartnerResponse> => {
    return axiosInstance.get<AllPartnerResponse, any>('/partner/all');
}
