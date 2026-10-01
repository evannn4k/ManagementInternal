import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TaskType } from "@/types/data/task";
import { useDraggable } from "@dnd-kit/react";
import { Link } from "@inertiajs/react";
import { FileText, MoreVertical, SquarePen, Trash2 } from "lucide-react";

export function TaskCard({
    task,
    isEdit,
    handleDelete,
}: {
    task: TaskType;
    isEdit: boolean;
    handleDelete: (id: string) => void;
}) {
    const { ref } = useDraggable({
        id: task.id,
        disabled: !isEdit,
    });

    return (
        <Card
            ref={ref}
            className={cn(
                "bg-background/50 w-full",
                isEdit ? "cursor-grab" : "cursor-pointer",
            )}
            key={task.id}
        >
            <CardHeader>
                <div className="flex flex-col gap-2 min-w-0">
                    <CardTitle>{task.title}</CardTitle>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: task.description,
                        }}
                        className="text-xs w-full line-clamp-3 break-words [&_p]:m-0 [&_pre]:m-0 [&_pre]:whitespace-pre-wrap"
                    />
                    <div className="flex items-start flex-wrap gap-1">
                        {task.label.slice(0, 3).map((label) => (
                            <Badge key={label} className="rounded-full text-xs">
                                {label}
                            </Badge>
                        ))}
                    </div>
                </div>
                <CardAction>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                            >
                                <MoreVertical className="size-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <SquarePen />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="#">
                                    <FileText />
                                    Detail
                                </Link>
                            </DropdownMenuItem>
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDelete(task.id);
                                    }}
                                >
                                    <Trash2 />
                                    Delete
                                </DropdownMenuItem>
                            </>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 min-w-0">
                <div className="flex justify-between items-center gap-2 w-full">
                    <Badge
                        className={cn("capitalize text-xs rounded-sm", {
                            "text-blue-800": task.priority === "low",
                            "text-yellow-800": task.priority === "medium",
                            "text-red-800": task.priority === "high",
                            "text-black/80": task.priority === "urgent",
                        })}
                        variant="outline"
                    >
                        {task.priority}
                    </Badge>
                    {task.due_date && (
                        <div className="text-xs text-muted-foreground">
                            Target: {task.due_date}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
