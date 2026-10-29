import {
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProjectStatusType } from "@/types/data/project";
import { useEffect, useState } from "react";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { ProjectStatus } from "./project-status";
import { TaskType } from "@/types/data/task";
import { router } from "@inertiajs/react";
import { UseModalReturn } from "@/types/modal";
import { status as changeStatus } from "@/routes/task/change/index";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function TaskKanban({
    statuses: initialStatus,
    taskModal,
    projectStatusModal,
}: {
    statuses: ProjectStatusType[];
    taskModal: UseModalReturn;
    projectStatusModal: UseModalReturn;
}) {
    const [statuses, setStatuses] = useState(initialStatus);

    useEffect(() => {
        setStatuses(initialStatus);
    }, [initialStatus]);

    const handleDragEnd = ({ operation, canceled }: DragEndEvent) => {
        if (canceled || !operation.target) {
            return;
        }

        const taskId = operation.source ? operation.source.id : null;
        const statusId = operation.target.id;

        let oldStatus: ProjectStatusType | undefined;
        let draggedTask: TaskType | undefined;

        for (const status of statuses) {
            const foundTask = status.tasks.find((t) => t.id == taskId);

            if (foundTask) {
                oldStatus = status;
                draggedTask = foundTask;
                break;
            }
        }

        const targetStatus = statuses.find((s) => s.id == statusId);

        if (!targetStatus || !oldStatus || !draggedTask) return;
        if (targetStatus.id == oldStatus.id) return;

        setStatuses((prev) => {
            return prev.map((status) => {
                if (status.id === oldStatus.id) {
                    return {
                        ...status,
                        tasks: status.tasks.filter(
                            (t) => t.id != draggedTask.id,
                        ),
                    };
                }

                if (targetStatus && status.id === targetStatus.id) {
                    return {
                        ...status,
                        tasks: [...status.tasks, draggedTask],
                    };
                }
                return status;
            });
        });

        router.patch(
            changeStatus(taskId as string).url,
            { status_id: statusId },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <DragDropProvider onDragEnd={handleDragEnd}>
                <CardHeader>
                    <CardTitle className="my-auto">Kanban Tugas</CardTitle>
                    <CardAction>
                        <Button
                            size="sm"
                            onClick={() => taskModal.openCreate()}
                        >
                            <Plus /> Tambah Tugas
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="pb-4 flex items-start gap-4 w-full overflow-x-auto">
                    {statuses.map((status) => (
                        <ProjectStatus
                            key={status.id}
                            status={status}
                            taskModal={taskModal}
                            projectStatusModal={projectStatusModal}
                        />
                    ))}
                </CardContent>
            </DragDropProvider>
        </>
    );
}
