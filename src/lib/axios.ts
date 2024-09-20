import axios from "axios";

import { AuthFormResult, SignInFormPayload, SignUpFormPayload } from "@/types";

import { env } from "../../env";

const api = axios.create({ baseURL: env.NEXT_PUBLIC_SERVER_BASE_URL });

export const regiterUser = async (payload: SignUpFormPayload) => {
  return await api.post<AuthFormResult>("/auth/register", { ...payload });
};

export const signInUser = async (payload: SignInFormPayload) => {
  return await api.post<AuthFormResult>("/auth/login", { ...payload });
};
