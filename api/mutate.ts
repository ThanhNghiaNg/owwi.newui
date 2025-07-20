import { useMutation } from "@tanstack/react-query";
import { userLogin, userLogout, userRegister } from "./user";
import { createTransaction, deleteTransaction, updateTransaction } from "./transaction";
import queryClient from "./queryClient";
import { keys as queryKeys } from "./query";
import { createPartner, deletePartner, updatePartner } from "./partners";
import { createCategory, deleteCategory, updateCategory } from "./category";

export const MutationKey = {
  user: {
    mutation: ["user-mutation"],
    login: () => [...MutationKey.user.mutation, "login"],
    logout: () => [...MutationKey.user.mutation, "logout"],
    register: () => [...MutationKey.user.mutation, "register"],
  },
  transaction: {
    mutation: ["transaction-mutation"],
    create: () => [...MutationKey.transaction.mutation, "create"],
    update: () => [...MutationKey.transaction.mutation, "update"],
    delete: () => [...MutationKey.transaction.mutation, "delete"],
  },
  partner: {
    mutation: ["partner-mutation"],
    create: () => [...MutationKey.partner.mutation, "create"],
    update: () => [...MutationKey.partner.mutation, "update"],
    delete: () => [...MutationKey.partner.mutation, "delete"],
  },
  category: {
    mutation: ["category-mutation"],
    create: () => [...MutationKey.category.mutation, "create"],
    update: () => [...MutationKey.category.mutation, "update"],
    delete: () => [...MutationKey.category.mutation, "delete"],
  },
};

export const mutation = {
  user: {
    login: () =>
      useMutation({
        mutationKey: MutationKey.user.login(),
        mutationFn: userLogin,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.all],
          });
        }
      }),
    logout: (onSuccess: () => void, onError: () => void) =>
      useMutation({
        mutationKey: MutationKey.user.logout(),
        mutationFn: userLogout,
        onSuccess,
        onError,
      }),
    register: () =>
      useMutation({
        mutationKey: MutationKey.user.register(),
        mutationFn: userRegister,
      }),
  },
  transaction: {
    create: () => useMutation({
      mutationKey: MutationKey.transaction.create(),
      mutationFn: createTransaction,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.transactions()
        })
      }
    }),
    update: () => useMutation({
      mutationKey: MutationKey.transaction.update(),
      mutationFn: updateTransaction,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.transactions()
        })
      }
    }),
    delete: () => useMutation({
      mutationKey: MutationKey.transaction.delete(),
      mutationFn: deleteTransaction,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.transactions()
        })
      }
    })
  },
  partner: {
    create: () => useMutation({
      mutationKey: MutationKey.partner.create(),
      mutationFn: createPartner,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.partners()
        })
      }
    }),
    update: () => useMutation({
      mutationKey: MutationKey.partner.update(),
      mutationFn: updatePartner,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.partners()
        })
      }
    }),
    delete: () => useMutation({
      mutationKey: MutationKey.partner.delete(),
      mutationFn: deletePartner,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.partners()
        })
      }
    })
  },
  category: {
    create: () => useMutation({
      mutationKey: MutationKey.category.create(),
      mutationFn: createCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.categories()
        })
      }
    }),
    update: () => useMutation({
      mutationKey: MutationKey.category.update(),
      mutationFn: updateCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.categories()
        })
      }
    }),
    delete: () => useMutation({
      mutationKey: MutationKey.category.delete(),
      mutationFn: deleteCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.categories()
        })
      }
    })
  },
};
