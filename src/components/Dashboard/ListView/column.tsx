"use client";

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";

import DeleteTaskDialog from "@/components/Task/DeleteTaskDialog";
import TaskDialog from "@/components/Task/TaskDialog";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { ITask } from "@/types";

const priorityColors = {
  Low: "bg-green-500 hover:bg-green-500/90",
  Medium: "bg-yellow-500 hover:bg-yellow-500/90",
  High: "bg-red-500 hover:bg-red-500/90",
};

export const columns: ColumnDef<ITask>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <Badge className={cn(priorityColors[task.priority])}>
          {task.priority}
        </Badge>
      );
    },
  },

  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <>
          <p className="text-red-500">{format(task.dueDate, "dd/MM/yyyy")}</p>
        </>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;

      const [editTaskDialog, setEditTaskDialog] = useState(false);
      const [deleteTaskDialog, setDeleteTaskDialog] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full p-2 text-gray-400 hover:bg-gray-200">
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
          {editTaskDialog && (
            <TaskDialog
              isOpen={editTaskDialog}
              onClose={() => setEditTaskDialog(false)}
              formMode="Edit"
              task={task}
            />
          )}
          {deleteTaskDialog && (
            <DeleteTaskDialog
              open={deleteTaskDialog}
              setOpen={setDeleteTaskDialog}
              taskId={task._id}
            />
          )}
        </>
      );
    },
  },
];
