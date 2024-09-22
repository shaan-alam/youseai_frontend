"use client";

import { useAtom } from "jotai";
import { LayoutGrid, List } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import { viewAtom } from "@/store";

import { Button } from "../ui/button";

const ViewSelector = () => {
  const [view, setView] = useAtom(viewAtom);

  return (
    <>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className={cn(view === "list" ? "bg-secondary" : "")}
                variant="ghost"
                size="sm"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>List View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className={cn(view === "kanban" ? "bg-secondary" : "")}
                variant="ghost"
                size="sm"
                onClick={() => setView("kanban")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Kanban View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default ViewSelector;
