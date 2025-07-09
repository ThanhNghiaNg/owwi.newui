import { useMutation } from "@tanstack/react-query";
import { userLogin, userRegister } from "./user";

export const MutationKey = {
  user: {
    mutation: ["user-mutation"],
    login: () => [...MutationKey.user.mutation, "login"],
    register: () => [...MutationKey.user.mutation, "register"],
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
};
