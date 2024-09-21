import { atom } from "jotai";

export const viewAtom = atom<"kanban" | "list">("list");
