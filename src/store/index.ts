import { User } from "@/types";
import { atom } from "jotai";

export const viewAtom = atom<"kanban" | "list">("list");

export const userAtom = atom<User | null>(null)