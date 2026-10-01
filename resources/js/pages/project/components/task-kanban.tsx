import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProjectStatusType, ProjectType } from "@/types/data/project";
import { useState } from "react";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { ProjectStatus } from "./project-status";
import { Save, SquarePen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/types/data/task";
import { router } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import taskDelete from "@/actions/App/Http/Controllers/Task/DeleteTaskController";

type SelectedTaskType = {
    task_id: string;
    status_id: string;
};

export function TaskKanban({
    statuses: initialStatus,
}: {
    statuses: ProjectStatusType[];
}) {
    const [selectedTask, setSelectedTask] = useState<
        SelectedTaskType[] | undefined
    >();
    const [statuses, setStatuses] = useState(initialStatus);
    const [processing, setProcessing] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

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
                onSuccess: ({ props }: any) => {
                    const project = props.project as ProjectType;
                    setStatuses(project.statuses);
                    setSelectedTask([]);
                    setIsEdit(false);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    const handleDelete = (id: string) => {
        console.log(taskDelete({ id: id }).url);
        router.delete(taskDelete({ id: id }).url);
    };

    return (
        <Card className="p-0 bg-muted/50 gap-0">
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
                                Save
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                setIsEdit((prev) => !prev);
                            }}
                            size="sm"
                            variant={isEdit ? "destructive" : "default"}
                        >
                            {isEdit ? <X /> : <SquarePen />}
                            {isEdit ? "Batal" : "Edit"}
                        </Button>
                    </div>
                </CardAction>
            </CardHeader>
            <CardContent className="flex items-start gap-4 w-full flex-nowrap no-scrollbar overflow-x-auto pb-4">
                <DragDropProvider onDragEnd={handleDragEnd}>
                    {statuses.map((status) => (
                        <ProjectStatus
                            key={status.id}
                            status={status}
                            isEdit={isEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </DragDropProvider>
            </CardContent>
        </Card>
    );
}
