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
import { UseModalReturn } from "@/types/modal";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ClipboardX, MoreVertical, SquarePen, Trash2 } from "lucide-react";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyDescription,
} from "@/components/ui/empty";

export function ProjectStatus({
    status,
    taskModal,
    projectStatusModal,
}: {
    status: ProjectStatusType;
    taskModal: UseModalReturn;
    projectStatusModal: UseModalReturn;
}) {
    const { ref } = useDroppable({
        id: status.id,
    });

    return (
        <Item
            key={status.id}
            ref={ref}
            className={cn(
                "w-54 flex-shrink-0 bg-muted/50 gap-0 flex flex-col items-center justify-start transition-all ease-in-out duration-200 p-2 rounded-2xl",
            )}
        >
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
                {status.tasks.length > 0 ? (
                    status.tasks.map((task) => (
                        <TaskCard key={task.id} task={task} modal={taskModal} />
                    ))
                ) : (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia>
                                <ClipboardX />
                            </EmptyMedia>
                            <EmptyDescription className="text-xs/4">Belum ada tugas</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
            </ItemContent>
        </Item>
    );
}
