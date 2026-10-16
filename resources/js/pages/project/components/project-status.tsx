import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemTitle,
} from "@/components/ui/item";
import { ProjectStatusType } from "@/types/data/project";
import { useDroppable } from "@dnd-kit/react";
import { TaskCard } from "./task-card";
import { Link } from "@inertiajs/react";
import { UseModalReturn } from "@/types/modal";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, SquarePen, Trash2 } from "lucide-react";
import { detail as taskDetail } from "@/actions/App/Http/Controllers/Task/ViewTaskController";

export function ProjectStatus({
    status,
    isEdit,
    taskModal,
    projectStatusModal,
}: {
    status: ProjectStatusType;
    isEdit: boolean;
    taskModal: UseModalReturn;
    projectStatusModal: UseModalReturn;
}) {
    const { ref } = useDroppable({
        id: status.id,
        disabled: !isEdit,
    });

    return (
        <Item
            key={status.id}
            ref={ref}
            className={cn(
                "w-54 flex-shrink-0 h-full gap-0 flex flex-col items-center justify-start transition-all ease-in-out duration-200",
                isEdit ? "relative p-2" : "p-0",
            )}
        >
            {isEdit && (
                <Skeleton className="absolute h-full w-full rounded-xl" />
            )}
            <ItemHeader className="p-2 w-full flex justify-between">
                <div className="">
                    <ItemTitle className="capitalize text-base">
                        {status.name}
                        <Badge
                            className="rounded-full text-xs"
                            variant="outline"
                        >
                            {status.tasks.length ?? 0}
                        </Badge>
                    </ItemTitle>
                    <ItemDescription className="text-xs capitalize">
                        {status.type}
                    </ItemDescription>
                </div>
                <ItemActions>
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
                                onClick={() => {
                                    projectStatusModal.openEdit(status);
                                }}
                            >
                                <SquarePen />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() => {
                                    projectStatusModal.openDelete(status.id);
                                }}
                            >
                                <Trash2 />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ItemActions>
            </ItemHeader>
            <ItemContent className="p-0 flex-1 flex flex-col gap-3 w-full">
                {status.tasks.map((task) => {
                    if (isEdit) {
                        return (
                            <TaskCard
                                key={task.id}
                                task={task}
                                isEdit={isEdit}
                                modal={taskModal}
                            />
                        );
                    } else {
                        return (
                            <Link
                                href={taskDetail({ id: task.id }).url}
                                key={task.id}
                            >
                                <TaskCard
                                    task={task}
                                    isEdit={isEdit}
                                    modal={taskModal}
                                />
                            </Link>
                        );
                    }
                })}
            </ItemContent>
        </Item>
    );
}
