import { axiosInstance } from "../axios";
import { CategoryResponse } from "../types";

type AllCategoryResponse = CategoryResponse[]
export const getAllCategories = async (): Promise<AllCategoryResponse> => {
    return axiosInstance.get<AllCategoryResponse, any>('/categories');
}

type BaseCategory = {
    id: string; 
    name: string;
    type: string;
    description?: string;
}

type CreateCategory = Omit<BaseCategory, 'id'>
export const createCategory = async (category: CreateCategory) => {
    return axiosInstance.post('/categories', category)
}

type UpdateCategory = BaseCategory
export const updateCategory = async (category: UpdateCategory) => {
    return axiosInstance.put(`/categories/${category.id}`, category)
}

export const deleteCategory = async (id: string) => {
    return axiosInstance.delete(`/categories/${id}`)
}
