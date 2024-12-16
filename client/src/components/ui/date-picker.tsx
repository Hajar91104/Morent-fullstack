import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RenderIf } from "../shared/RenderIf";

type Props = {
  onChange: (date?: Date) => void;
  hidePastDates?: boolean;
  defaultDate?: string | null;
  variant?: "primary" | "secondary";
};
export function DatePickerDemo({
  onChange,
  hidePastDates = false,
  defaultDate,
  variant = "primary",
}: Props) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultDate ? new Date(defaultDate) : undefined
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-start text-left p-0 hover:bg-transparent text-xs !text-secondary-300 font-medium tracking-[-0.24px]",
            !date && "text-muted-foreground",
            variant === "secondary" &&
              "bg-[#F6F7F9] p-4 hover:bg-[#F6F7F9] text-sm font-normal rounded-md shadow-sm"
          )}
        >
          <RenderIf condition={variant === "primary"}>
            <CalendarIcon className="mr-2 h-4 w-4" />
          </RenderIf>

          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          disabled={hidePastDates ? { before: new Date() } : undefined}
          mode="single"
          selected={date}
          onSelect={(date) => {
            onChange(date);
            setDate(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
