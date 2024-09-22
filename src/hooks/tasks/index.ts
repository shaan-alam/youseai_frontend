import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Task } from "@/components/Task/TaskDialog";

import { createTask, deleteTask, getTasks, updateTask } from "@/lib/axios";
import { showAxiosError } from "@/lib/utils";

import { ITask, TaskStatus } from "@/types";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Task) => {
      try {
        const { data } = await createTask(payload);
        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
      toast.success("Task created successfully!");
    },
  });
};

export const useGetTasksQuery = () => {
  return useQuery({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      try {
        const { data } = await getTasks();
        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
  });
};

type UpdateTaskMutationPayload = {
  taskId: string;
  newStatus: TaskStatus;
  newIndex: number;
};

export const useUpdateStatusMutation = (
  options?: UseMutationOptions<
    ITask | undefined,
    Error,
    UpdateTaskMutationPayload,
    { previousTasks: ITask[] }
  >
) => {
  return useMutation({
    mutationFn: async ({ taskId, newStatus }: UpdateTaskMutationPayload) => {
      try {
        const { data } = await updateTask(taskId, { status: newStatus });
        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    ...options,
  });
};

export const useDeleteTaskMutation = (
  taskId: string,
  closeModal: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await deleteTask(taskId);
        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    onSuccess: () => {
      toast.success("Task deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
      closeModal();
    },
  });
};

export const useUpdateTaskMutation = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<ITask>) => {
      try {
        const { data } = await updateTask(taskId, { ...payload });
        return data;
      } catch (err) {
        showAxiosError(err);
      }
    },
    onSuccess: () => {
      toast.success("Updated Task successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
  });
};
