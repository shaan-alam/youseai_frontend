"use client";

import { useGetTasksQuery } from "@/hooks/tasks";

import TaskManagement from "./KanbanBoard";

const Dashboard = () => {
  const { data } = useGetTasksQuery();

  return <>{data && <TaskManagement tasks={data} />}</>;
};

export default Dashboard;
