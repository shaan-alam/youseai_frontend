import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showAxiosError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return toast.error(err.response?.data?.message);
  }
};
