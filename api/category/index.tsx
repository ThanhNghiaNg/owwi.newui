import { axiosInstance } from "../axios";
import { CategoryResponse } from "../types";

type AllCategoryResponse = CategoryResponse[]
export const getAllCategories = async (): Promise<AllCategoryResponse> => {
    return axiosInstance.get<AllCategoryResponse, any>('/v2/categories');
}

type BaseCategory = {
    _id: string; 
    name: string;
    type: string;
    description?: string;
}

type CreateCategory = Omit<BaseCategory, '_id'>
export const createCategory = async (category: CreateCategory) => {
    return axiosInstance.post('/v2/categories', category)
}

type UpdateCategory = BaseCategory
export const updateCategory = async (category: UpdateCategory) => {
    return axiosInstance.put(`/v2/categories/${category._id}`, category)
}

export const deleteCategory = async (id: string) => {
    return axiosInstance.delete(`/v2/categories/${id}`)
}
