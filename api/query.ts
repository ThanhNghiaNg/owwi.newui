import { queryOptions } from "@tanstack/react-query";
import { getTransactionById, GetTransactionParams, getTransactions } from "./transaction";
import { whoami } from "./user";
export const keys = {
    all: ['all'],
    user: ['user'],
    userWhoami: () => [...keys.all, 'user', 'whoami'],
    transaction: (id: string) => ['transaction', id],
    transactions: (query: GetTransactionParams) => ['transaction', 'list', JSON.stringify(query)],
    category: (id: string) => ['category', id],
    categories: (query: { page: number, pageSize: number }) => ['category', 'list', query.page, query.pageSize],
    partner: (id: string) => ['partner', id],
    partners: (query: { page: number, pageSize: number }) => ['partner', 'list', query.page, query.pageSize],
}

export const query = {
    user: {
        whoami : () => queryOptions({
            queryKey: keys.userWhoami(),
            queryFn: whoami,
            staleTime(query) {
                // 1 hour
                return 1000 * 60 * 60;
            },
        })
    },
    transaction: {
        getById: (id: string) =>
            queryOptions({
                queryKey: keys.transaction(id),
                queryFn: () => getTransactionById(id),
            }),
        getAll: (query: GetTransactionParams) =>
            queryOptions({
                queryKey: keys.transactions(query),
                queryFn: () => getTransactions(query),
                
            }),
    },
};