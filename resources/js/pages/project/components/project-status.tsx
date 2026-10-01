import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { ProjectStatusType } from "@/types/data/project";
import { useDroppable } from "@dnd-kit/react";
import { TaskCard } from "./task-card";
import { Link } from "@inertiajs/react";

export function ProjectStatus({
    status,
    isEdit,
    handleDelete,
}: {
    status: ProjectStatusType;
    isEdit: boolean;
    handleDelete: (id: string) => void;
}) {
    const { ref } = useDroppable({
        id: status.id,
        disabled: !isEdit,
    });

    return (
        <Item
            key={status.id}
            ref={ref}
            className="w-58 flex-shrink-0 p-0 h-full flex-col items-start justify-start"
        >
            <ItemHeader className="px-1">
                <ItemTitle className="capitalize">
                    <span className="text-primary text-lg">•</span>{" "}
                    {status.name}
                </ItemTitle>
            </ItemHeader>
            <ItemContent className="p-0 flex flex-col gap-3 w-full">
                {status.tasks.map((task) => {
                    if (isEdit) {
                        return (
                            <TaskCard
                                key={task.id}
                                task={task}
                                isEdit={isEdit}
                                handleDelete={handleDelete}
                            />
                        );
                    } else {
                        return (
                            <Link href={"/tasks/" + task.id} key={task.id}>
                                <TaskCard
                                    task={task}
                                    isEdit={isEdit}
                                    handleDelete={handleDelete}
                                />
                            </Link>
                        );
                    }
                })}
            </ItemContent>
        </Item>
    );
}
