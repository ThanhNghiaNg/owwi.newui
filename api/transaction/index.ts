import { axiosInstance } from "../axios"
import { TableResponse, TransactionResponse } from "../types";

export const getTransactionById = async (id: string) => {
    return axiosInstance.get(`/transaction/${id}`)
}

export interface TableFilter {
    cursor?: string | null;
    limit?: number;
    filter?: string;
}

export interface GetTransactionParams extends TableFilter {
    page?: number;
    limit?: number;
    filter?: string;
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
export const createTransaction = async (transaction: CreateTransaction) => {
    return axiosInstance.post('/v2/transactions', transaction)
}

type UpdateTransaction = BaseTransaction
export const updateTransaction = async (transaction: UpdateTransaction) => {
    return axiosInstance.put(`/v2/transactions/${transaction._id}`, transaction)
}

export const deleteTransaction = async (id: string) => {
    return axiosInstance.delete(`/v2/transactions/${id}`)
}

type StatisticWeeklyResponse = {
    labels: string[];
    datasets: [
        {
            label: string;
            data: number[];
            backgroundColor: string;
        }
    ]
}
export const statisticWeekly = async () => {
    return axiosInstance.get<any, StatisticWeeklyResponse>(`/v2/transactions/statistic/weekly`)
}

type StatisticMonthlyResponse = Array<{
    label: string;
    value: number;
}>
export const statisticMonthly = async () => {
    return axiosInstance.get<any, StatisticMonthlyResponse>(`/v2/transactions/statistic/monthly`)
}

type StatisticMonthResponse = Array<{
    name: string;
    totalAmount: number;
    color: string;
}>
export const statisticMonth = async (month: number) => {
    return axiosInstance.get<any, StatisticMonthResponse>(`/v2/transactions/statistic/month?month=${month}`)
}