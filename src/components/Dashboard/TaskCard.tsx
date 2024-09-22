"use client";

import { useState } from "react";

import { MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CreateTaskFormResult } from "@/types";

import DeleteTaskDialog from "../Task/DeleteTaskDialog";
import TaskDialog from "../Task/TaskDialog";

export default function TaskCard({ task }: { task: CreateTaskFormResult }) {
  const [editTaskDialog, setEditTaskDialog] = useState(false);
  const [deleteTaskDialog, setDeleteTaskDialog] = useState(false);

  const priorityColors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <div className="mb-2 rounded-sm bg-neutral-100 dark:bg-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm">{task.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full p-2 text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700">
            <MoreVertical size={17} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Task Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setEditTaskDialog(true)}>
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 focus:bg-red-100 focus:text-red-500"
              onClick={() => setDeleteTaskDialog(true)}
            >
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <p className="mb-2 text-xs text-gray-500">{task.description}</p>
        <Badge className={`${priorityColors[task.priority]} text-white`}>
          {task.priority}
        </Badge>
      </div>
      {editTaskDialog && (
        <TaskDialog
          isOpen={editTaskDialog}
          onClose={() => setEditTaskDialog(false)}
          formMode="Create"
          task={task}
        />
      )}
      {deleteTaskDialog && (
        <DeleteTaskDialog
          taskId={task._id}
          open={deleteTaskDialog}
          setOpen={setDeleteTaskDialog}
        />
      )}
    </div>
  );
}
