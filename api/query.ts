import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getTransactionById, GetTransactionParams, getTransactions, TableResponse } from "./transaction";
import { whoami } from "./user";
import { Transaction } from "@/lib/types";
export const keys = {
    all: ['all'],
    user: ['user'],
    userWhoami: () => [...keys.all, 'user', 'whoami'],
    transaction: (id: string) => ['transaction', id],
    transactions: () => ['transactions'],
    // transactions: (query: GetTransactionParams) => ['transaction', 'list', JSON.stringify(query)],
    category: (id: string) => ['category', id],
    categories: (query: { page: number, pageSize: number }) => ['category', 'list', query.page, query.pageSize],
    partner: (id: string) => ['partner', id],
    partners: (query: { page: number, pageSize: number }) => ['partner', 'list', query.page, query.pageSize],
}

export const query = {
    user: {
        whoami: () => queryOptions({
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
        getAllTransaction: (query: GetTransactionParams) => infiniteQueryOptions({
            queryKey: keys.transactions(),
            queryFn: ({ pageParam }: { pageParam: string | null }) => getTransactions({ cursor: pageParam, ...query }),
            initialPageParam: null,
            staleTime: 1000 * 60 * 5, // 5 minutes
            getNextPageParam: (lastPage: TableResponse<Transaction> | any) => {
                return lastPage?.nextCursor || null
            },
        })
    },
};