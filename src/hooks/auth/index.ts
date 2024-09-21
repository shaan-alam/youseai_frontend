import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { regiterUser, signInUser } from "@/lib/axios";
import { showAxiosError } from "@/lib/utils";

import { userAtom } from "@/store";
import {
  AuthFormResult,
  SignInFormPayload,
  SignUpFormPayload,
  User,
} from "@/types";

export const useCreateUserMutation = (
  options?: UseMutationOptions<
    AuthFormResult | undefined,
    Error,
    SignUpFormPayload,
    unknown
  >
) => {
  const [_, setUser] = useAtom(userAtom);

  return useMutation({
    mutationFn: async (payload: SignUpFormPayload) => {
      try {
        const { data } = await regiterUser(payload);
        const { user } = data;
        setUser({ name: user.name, email: user.email });
        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    ...options,
  });
};

export const useSignInUserMutation = (
  options?: UseMutationOptions<
    AuthFormResult | undefined,
    Error,
    SignInFormPayload,
    unknown
  >
) => {
  const [_, setUser] = useAtom(userAtom);

  return useMutation({
    mutationFn: async (payload: SignInFormPayload) => {
      try {
        const { data } = await signInUser(payload);

        const { user } = data;
        setUser({ name: user.name, email: user.email });

        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    ...options,
  });
};
