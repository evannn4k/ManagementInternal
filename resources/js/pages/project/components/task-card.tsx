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
import { UseModalReturn } from "@/types/modal";
import { useDraggable } from "@dnd-kit/react";
import { Link, router } from "@inertiajs/react";
import { FileText, MoreVertical, SquarePen, Trash2 } from "lucide-react";
import { detail as taskDetail } from "@/actions/App/Http/Controllers/Task/ViewTaskController";

export function TaskCard({
    task,
    modal,
}: {
    task: TaskType;
    modal: UseModalReturn;
}) {
    const { ref } = useDraggable({
        id: task.id,
    });

    const handleClick = () => {
        router.get(taskDetail(task.id).url);
    };

    return (
        <Card
            onClick={handleClick}
            ref={ref}
            className={cn("w-full z-10 cursor-grab")}
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
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    modal.openEdit(task);
                                }}
                            >
                                <SquarePen />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={taskDetail({ id: task.id }).url}>
                                    <FileText />
                                    Detail
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    modal.openDelete(task.id);
                                }}
                            >
                                <Trash2 />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 min-w-0">
                <div className="flex justify-between items-center gap-2 w-full">
                    <Badge
                        className={cn("capitalize text-xs rounded-sm", {
                            "text-blue-800 dark:text-blue-500":
                                task.priority === "low",
                            "text-yellow-800 dark:text-yellow-500":
                                task.priority === "medium",
                            "text-red-800 dark:text-red-500":
                                task.priority === "high",
                            "text-foreground": task.priority === "urgent",
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
