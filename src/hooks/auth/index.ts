import { useRouter } from "next/navigation";

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { logout, regiterUser, signInUser, whoAmI } from "@/lib/axios";
import { showAxiosError } from "@/lib/utils";

import { userAtom } from "@/store";
import { AuthFormResult, SignInFormPayload, SignUpFormPayload } from "@/types";

export const useCreateUserMutation = (
  options?: UseMutationOptions<
    AuthFormResult | undefined,
    Error,
    SignUpFormPayload,
    unknown
  >
) => {
  const [, setUser] = useAtom(userAtom);

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
  const [, setUser] = useAtom(userAtom);

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

export const useWhoAmIMutation = () => {
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();
  router.push("/");

  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await whoAmI();

        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    onSuccess: (result) => {
      if (result) {
        const { user } = result;
        setUser({ name: user.name, email: user.email });
        router.push("/dashboard");
      }
    },
    onError: (err) => {
      console.log("err", err);
      setUser(null);
      router.push("/");
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await logout();
        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    onSuccess: () => {
      router.push("/");
    },
  });
};
