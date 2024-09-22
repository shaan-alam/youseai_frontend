"use client";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { CreateTaskFormResult } from "@/types";

import TaskCard from "./TaskCard";

const columns = ["To Do", "In Progress", "Completed"];

const KanbanBoard = ({ tasks }: { tasks: CreateTaskFormResult[] }) => {
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
};

export default KanbanBoard;
