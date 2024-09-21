"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { toast } from "sonner";

import { useUpdateTaskMutation } from "@/hooks/tasks";

import { viewAtom } from "@/store";
import { ITask } from "@/types";

import KanbanBoard from "./KanbanBoard";
import ListView from "./ListView";

const TaskManagement = ({ tasks }: { tasks: ITask[] }) => {
  const queryClient = useQueryClient();

  const [view, setView] = useAtom(viewAtom);

  const { mutate: reorderTask } = useUpdateTaskMutation({
    onMutate: async ({ taskId, newStatus, newIndex }) => {
      await queryClient.cancelQueries({ queryKey: ["get-tasks"] });
      const previousTasks =
        queryClient.getQueryData<ITask[]>(["get-tasks"]) || [];

      if (previousTasks.length > 0) {
        const updatedTasks = previousTasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        });

        const taskIndex = updatedTasks.findIndex((task) => task._id === taskId);
        const [reorderedTask] = updatedTasks.splice(taskIndex, 1);
        updatedTasks.splice(newIndex, 0, reorderedTask);

        queryClient.setQueryData<ITask[]>(["get-tasks"], updatedTasks);
      }

      toast.success("Reordered Tasks!");
      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<ITask[]>(["get-tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newStatus = destination.droppableId as ITask["status"];

    reorderTask({
      taskId: draggableId,
      newStatus,
      newIndex: destination.index,
    });
  };

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {view === "kanban" ? (
          <KanbanBoard tasks={tasks} />
        ) : (
          <ListView tasks={tasks} />
        )}
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
