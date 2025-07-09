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
}
export interface GetTransactionParams extends TableFilter {
    page?: number;
    limit?: number;
    filter?: string;
}

interface Transaction {
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
    date: string; // ISO 8601 date string
  }

export const getTransactions = async (params: GetTransactionParams): Promise<TableResponse<Transaction>> => {
    return axiosInstance.get<TableResponse<Transaction>, any>('/v2/transactions', {
      params
    })
}