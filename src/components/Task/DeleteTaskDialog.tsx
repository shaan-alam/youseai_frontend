import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteTaskMutation } from "@/hooks/tasks";

import { Button } from "../ui/button";

type DeleteTaskDialogProps = {
  taskId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteTaskDialog = ({ taskId, open, setOpen }: DeleteTaskDialogProps) => {
  const { mutate: deleteTask, isPending } = useDeleteTaskMutation(taskId, () =>
    setOpen(false)
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this task? You can not undo it
            later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            isLoading={isPending}
            variant="destructive"
            onClick={() => deleteTask()}
          >
            <Trash className="h-4 w-4" />
            &nbsp; Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskDialog;
