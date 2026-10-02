import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProjectStatusType } from "@/types/data/project";
import { useEffect, useState } from "react";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { ProjectStatus } from "./project-status";
import { GripVertical, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/types/data/task";
import { router } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import { UseModalReturn } from "@/types/modal";

type SelectedTaskType = {
    task_id: string;
    status_id: string;
};

export function TaskKanban({
    statuses: initialStatus,
    taskModal,
    projectStatusModal,
}: {
    statuses: ProjectStatusType[];
    taskModal: UseModalReturn;
    projectStatusModal: UseModalReturn;
}) {
    const [selectedTask, setSelectedTask] = useState<
        SelectedTaskType[] | undefined
    >();
    const [statuses, setStatuses] = useState(initialStatus);
    const [processing, setProcessing] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

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

        if (draggedTask.status_id != targetStatus.id) {
            setSelectedTask((prev: SelectedTaskType[] | undefined) => {
                prev = prev ?? [];

                const prevTask = prev.filter(
                    (t) => t.task_id != draggedTask.id,
                );

                return [
                    ...prevTask,
                    { task_id: draggedTask.id, status_id: targetStatus.id },
                ];
            });
        } else {
            setSelectedTask((prev: SelectedTaskType[] | undefined) => {
                prev = prev ?? [];

                return prev.filter((t) => t.task_id != draggedTask.id);
            });
        }
    };

    const handleSaveChangeStatus = () => {
        router.put(
            "/task/change-status",
            { task: selectedTask },
            {
                onBefore: () => {
                    setProcessing(true);
                },
                onSuccess: () => {
                    setSelectedTask([]);
                    setIsEdit(false);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <>
            <Card className="p-0 bg-muted/50 gap-2">
                <CardHeader className="pt-4">
                    <CardTitle>Kanban Tugas</CardTitle>
                    <CardAction>
                        <div className="flex items-center gap-2">
                            {isEdit && (
                                <Button
                                    onClick={handleSaveChangeStatus}
                                    size="sm"
                                    disabled={
                                        (selectedTask &&
                                            selectedTask?.length <= 0) ||
                                        processing
                                    }
                                >
                                    {processing ? <Spinner /> : <Save />}
                                    Simpan
                                </Button>
                            )}
                            <Button
                                onClick={() => {
                                    if (isEdit) {
                                        setStatuses(initialStatus);
                                    }
                                    setIsEdit((prev) => !prev);
                                }}
                                size="sm"
                                variant={isEdit ? "destructive" : "default"}
                            >
                                {isEdit ? <X /> : <GripVertical />}
                                {isEdit ? "Batal" : "Edit"}
                            </Button>
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex items-start gap-4 w-full flex-nowrap no-scrollbar overflow-x-auto pb-6">
                    <DragDropProvider onDragEnd={handleDragEnd}>
                        {statuses
                            .map((status) => (
                                <ProjectStatus
                                    key={status.id}
                                    status={status}
                                    isEdit={isEdit}
                                    taskModal={taskModal}
                                    projectStatusModal={projectStatusModal}
                                />
                            ))}
                    </DragDropProvider>
                </CardContent>
            </Card>
        </>
    );
}
