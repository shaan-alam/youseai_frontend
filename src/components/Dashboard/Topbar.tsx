"use client";

import { useState } from "react";

import { ClipboardList } from "lucide-react";

import AddTaskDialog from "../Task/AddTaskDialog";
import { Button } from "../ui/button";
import ViewSelector from "./VIewSelector";

const Topbar = () => {
  const [addTaskDialog, setAddTaskDialog] = useState(false);

  return (
    <div className="flex w-full items-center justify-between border-b p-4">
      <div>
        <h1 className="flex items-center text-xl font-semibold text-primary">
          <ClipboardList className="h-4 w-4" />
          &nbsp;Your Tasks
        </h1>
      </div>
      <div className="flex items-center">
        <ViewSelector />
        <Button className="ml-3" onClick={() => setAddTaskDialog(true)}>
          Add Task
        </Button>
      </div>
      {addTaskDialog && (
        <AddTaskDialog
          isOpen={addTaskDialog}
          onClose={setAddTaskDialog}
          onAdd={() => {}}
        />
      )}
    </div>
  );
};

export default Topbar;
