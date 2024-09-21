export type SignUpFormPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthFormResult = {
  user: {
    name: string;
    email: string;
    password: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};

export type SignInFormPayload = {
  email: string;
  password: string;
};

export type TaskStatus = "To Do" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export type CreateTaskFormResult = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskPayload = Omit<
  CreateTaskFormResult,
  "_id" | "createdAt" | "updatedAt"
>;

export type ITask = CreateTaskFormResult;