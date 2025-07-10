import { axiosInstance } from "../axios";

type Type = {
    _id: string;
    name: string;
    description?: string;
}


type AllTypeResponse = Type[]
export const getAllTypes = async (): Promise<AllTypeResponse> => {
    return axiosInstance.get<AllTypeResponse, any>('/user/type/all');
}
