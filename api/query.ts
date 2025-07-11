import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getTransactionById, GetTransactionParams, getTransactions } from "./transaction";
import { getAllTypes, whoami } from "./user";
import { Transaction } from "@/lib/types";
import { getAllCategories } from "./category";
import { getAllPartners } from "./partners";
import { FIVE_MINUTE_MILL, ONE_HOUR_MILL } from "@/utils/constants/variables";
import { TableResponse } from "./types";
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
                return ONE_HOUR_MILL;
            },
        })
    },
    type: {
        getAll: () => queryOptions({
            queryKey: keys.types(),
            queryFn: getAllTypes,
            staleTime: ONE_HOUR_MILL,
        })
    },
    category: {
        getAll: () => queryOptions({
            queryKey: keys.categories(),
            queryFn: getAllCategories,
            staleTime: ONE_HOUR_MILL,
        })
    },
    partner: {
        getAll: () => queryOptions({
            queryKey: keys.partners(),
            queryFn: getAllPartners,
            staleTime: ONE_HOUR_MILL,
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
            staleTime: FIVE_MINUTE_MILL, // 5 minutes
            getNextPageParam: (lastPage: TableResponse<Transaction> | any) => {
                return lastPage?.nextCursor || null
            },
        })
    },
};