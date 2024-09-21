"use client";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { LayoutGridIcon, ListIcon } from "lucide-react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useUpdateTaskMutation } from "@/hooks/tasks";

import { CreateTaskFormResult, ITask } from "@/types";

import TaskCard from "./TaskCard";

const columns = ["To Do", "In Progress", "Completed"];

function KanbanBoard({ tasks }: { tasks: CreateTaskFormResult[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((column) => (
        <div key={column}>
          <div className="mb-3 rounded-sm bg-primary-foreground p-2">
            <div>{column}</div>
          </div>
          <div>
            <Droppable droppableId={column} type="COLUMN">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TaskManagement({ tasks }: { tasks: ITask[] }) {
  const queryClient = useQueryClient();

  const [view, setView] = useState("kanban");

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
    onError: (err, newTodo, context) => {
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
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setView("kanban")}>
            <LayoutGridIcon className="mr-2 h-4 w-4" /> Kanban
          </Button>
          <Button variant="outline" onClick={() => setView("list")}>
            <ListIcon className="mr-2 h-4 w-4" /> List
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {view === "kanban" ? <KanbanBoard tasks={tasks} /> : <div></div>}
      </DragDropContext>
    </div>
  );
}
