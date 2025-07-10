import { useMutation } from "@tanstack/react-query";
import { userLogin, userRegister } from "./user";
import { createTransactions, deleteTransactions, updateTransactions } from "./transaction";
import queryClient from "./queryClient";
import { keys as queryKeys } from "./query";

export const MutationKey = {
  user: {
    mutation: ["user-mutation"],
    login: () => [...MutationKey.user.mutation, "login"],
    register: () => [...MutationKey.user.mutation, "register"],
  },
  transactions: {
    mutation: ["transactions-mutation"],
    createTransactions: () => [...MutationKey.transactions.mutation, "create"],
    updateTransactions: () => [...MutationKey.transactions.mutation, "update"],
    deleteTransactions: () => [...MutationKey.transactions.mutation, "delete"],
  },
};

export const mutation = {
  user: {
    login: () =>
      useMutation({
        mutationKey: MutationKey.user.login(),
        mutationFn: userLogin,
      }),
    register: () =>
      useMutation({
        mutationKey: MutationKey.user.register(),
        mutationFn: userRegister,
      }),
  },
  transactions: {
    createTransactions: () => useMutation({
      mutationKey: MutationKey.transactions.createTransactions(),
      mutationFn: createTransactions,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.transactions()
        })
      }
    }),
    updateTransactions: () => useMutation({
      mutationKey: MutationKey.transactions.updateTransactions(),
      mutationFn: updateTransactions,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.transactions()
        })
      }
    }),
    deleteTransactions: () => useMutation({
      mutationKey: MutationKey.transactions.deleteTransactions(),
      mutationFn: deleteTransactions,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.transactions()
        })
      }
    })
  }
};
