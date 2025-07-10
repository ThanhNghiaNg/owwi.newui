import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getTransactionById, GetTransactionParams, getTransactions, TableResponse } from "./transaction";
import { whoami } from "./user";
import { Transaction } from "@/lib/types";
import { getAllTypes } from "./types";
import { getAllCategories } from "./category";
import { getAllPartners } from "./partners";
export const keys = {
    all: ['all'],
    user: ['user'],
    userWhoami: () => [...keys.all, 'user', 'whoami'],
    transaction: (id: string) => [...keys.all, 'transaction', id],
    transactions: () => [...keys.all, 'transactions'],
    // transactions: (query: GetTransactionParams) => ['transaction', 'list', JSON.stringify(query)],
    category: (id: string) => [...keys.all, 'category', id],
    // categories: (query: { page: number, pageSize: number }) => [...keys.all, 'category', 'list', query.page, query.pageSize],
    partner: (id: string) => [...keys.all, 'partner', id],
    // partners: (query: { page: number, pageSize: number }) => [...keys.all, 'partner', 'list', query.page, query.pageSize],
    types: () => [...keys.all, 'types'],
    categories: () => [...keys.all, 'categories'],
    partners: () => [...keys.all, 'partners'],
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
    type: {
        getAll: () => queryOptions({
            queryKey: keys.types(),
            queryFn: getAllTypes,
            staleTime: 1000 * 60 * 60, // 1 hour
        })
    },
    category: {
        getAll: () => queryOptions({
            queryKey: keys.categories(),
            queryFn: getAllCategories,
            staleTime: 1000 * 60 * 60, // 1 hour
        })
    },
    partner: {
        getAll: () => queryOptions({
            queryKey: keys.partners(),
            queryFn: getAllPartners,
            staleTime: 1000 * 60 * 60, // 1 hour
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