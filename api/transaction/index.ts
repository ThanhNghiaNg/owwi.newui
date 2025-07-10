import { axiosInstance } from "../axios"

export const getTransactionById = async (id: string) => {
    return axiosInstance.get(`/transaction/${id}`)
}

export interface TableFilter {
    cursor?: string | null;
    limit?: number;
    filter?: string;
}
export type TableResponse<T> ={
    data: T[];
    nextCursor: string | null,
    hasNextPage: boolean;
    limit?: number;
}
export interface GetTransactionParams extends TableFilter {
    page?: number;
    limit?: number;
    filter?: string;
}

export interface TransactionResponse {
    _id: string;
    type: {
      _id: string;
      name: string;
    };
    category: {
      _id: string;
      name: string;
    };
    partner: {
      _id: string;
      name: string;
    };
    amount: number;
    description: string;
    isDone: boolean;
    date: string;
  }

export const getTransactions = async (params: GetTransactionParams): Promise<TableResponse<TransactionResponse>> => {
    return axiosInstance.get<TableResponse<TransactionResponse>, any>('/v2/transactions', {
      params
    })
}

type BaseTransaction = {
    _id: string; // Optional for creation
    type: string;
    category: string;
    partner: string;
    amount: number | string;
    description?: string;
    isDone?: boolean;
    date?: string;
}

type CreateTransaction = Omit<BaseTransaction, '_id'>
export const createTransactions = async (transaction: CreateTransaction) => {
    return axiosInstance.post('/v2/transactions', transaction)
}

type UpdateTransaction = BaseTransaction
export const updateTransactions = async (transaction: UpdateTransaction) => {
    return axiosInstance.put(`/v2/transactions/${transaction._id}`, transaction)
}

export const deleteTransactions = async (id: string) => {
    return axiosInstance.delete(`/v2/transactions/${id}`)
}