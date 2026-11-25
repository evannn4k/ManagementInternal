import * as React from "react";
import { addDays, format, parseISO } from "date-fns";
import { CalendarIcon, RotateCw } from "lucide-react";
import { Matcher, type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";
import { ProjectType } from "@/types/data/project";

export function DatePickerRange({
    project,
    date,
    setDate,
    conflictDate,
}: {
    project: ProjectType;
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    conflictDate: {
        from: Date | undefined;
        to: Date | undefined;
    }[];
}) {
    const disabled: Matcher[] = [
        { before: parseISO(project.start_date ?? "") },
        { after: parseISO(project.end_date ?? "") },
        ...conflictDate,
    ];

    const now = new Date();

    return (
        <div className="max-w-full flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="justify-start px-2.5 font-normal flex-1"
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={now}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        disabled={disabled}
                        modifiers={{ conflict: conflictDate }}
                        modifiersClassNames={{
                            conflict: "text-red-600 line-through opacity-100",
                        }}
                    />
                </PopoverContent>
            </Popover>
            <Button
                onClick={() => setDate({ from: undefined, to: undefined })}
                size="icon"
                variant="outline"
                type="button"
                className="flex-shirk-1"
            >
                <RotateCw />
            </Button>
        </div>
    );
}
