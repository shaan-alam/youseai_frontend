"use client";

import * as React from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type DatePickerProps = {
  value: Date | undefined;
  setValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export default function DatePicker({ value, setValue }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger className="block w-full">
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={setValue} />
      </PopoverContent>
    </Popover>
  );
}
