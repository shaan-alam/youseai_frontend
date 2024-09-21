import { DataTable } from "@/components/ui/data-table";

import { ITask } from "@/types";

import { columns } from "./column";

const ListView = ({ tasks }: { tasks: ITask[] }) => {
  return (
    <>
      <DataTable columns={columns} data={tasks} />
    </>
  );
};

export default ListView;
