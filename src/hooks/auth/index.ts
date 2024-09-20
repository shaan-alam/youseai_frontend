import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { regiterUser, signInUser } from "@/lib/axios";
import { showAxiosError } from "@/lib/utils";

import { AuthFormResult, SignInFormPayload, SignUpFormPayload } from "@/types";

export const useCreateUserMutation = (
  options?: UseMutationOptions<
    AuthFormResult | undefined,
    Error,
    SignUpFormPayload,
    unknown
  >
) => {
  return useMutation({
    mutationFn: async (payload: SignUpFormPayload) => {
      try {
        const { data } = await regiterUser(payload);
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
  return useMutation({
    mutationFn: async (payload: SignInFormPayload) => {
      try {
        const { data } = await signInUser(payload);
        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    ...options,
  });
};
