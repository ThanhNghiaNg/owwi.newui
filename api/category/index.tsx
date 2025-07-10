import { axiosInstance } from "../axios";

type Category = {
    _id: string;
    name: string;
    description?: string;
}


type AllCategoryResponse = Category[]
export const getAllCategories = async (): Promise<AllCategoryResponse> => {
    return axiosInstance.get<AllCategoryResponse, any>('category/all');
}
