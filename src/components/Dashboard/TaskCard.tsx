import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";

import { CreateTaskFormResult } from "@/types";

export default function TaskCard({ task }: { task: CreateTaskFormResult }) {
  const priorityColors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <div className="mb-2 p-4 bg-gray-100 rounded-sm">
      <div className='flex items-center justify-between'>
        <CardTitle className="text-sm">{task.title}</CardTitle>
      </div>
      <div>
        <p className="mb-2 text-xs text-gray-500">{task.description}</p>
        <Badge className={`${priorityColors[task.priority]} text-white`}>
          {task.priority}
        </Badge>
      </div>
    </div>
  );
}
