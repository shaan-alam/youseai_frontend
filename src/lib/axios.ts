import axios from "axios";

import { Task } from "@/components/Task/AddTaskDialog";

import {
  AuthFormResult,
  CreateTaskFormResult,
  ITask,
  SignInFormPayload,
  SignUpFormPayload,
} from "@/types";

import { env } from "../../env";

const api = axios.create({ baseURL: env.NEXT_PUBLIC_SERVER_BASE_URL });

export const regiterUser = async (payload: SignUpFormPayload) => {
  return await api.post<AuthFormResult>("/auth/register", { ...payload });
};

export const signInUser = async (payload: SignInFormPayload) => {
  return await api.post<AuthFormResult>("/auth/login", { ...payload });
};

export const createTask = async (payload: Task) => {
  return await api.post<CreateTaskFormResult>("/task/create", { ...payload });
};

export const getTasks = async () => {
  return await api.get<ITask[]>("/task");
};

export const updateTask = async (taskId: string, payload: Partial<ITask>) => {
  return await api.patch<ITask>(`/task/update/${taskId}`, { ...payload });
};

export const deleteTask = async (taskId: string) => {
  return await api.delete(`/task/delete/${taskId}`);
}