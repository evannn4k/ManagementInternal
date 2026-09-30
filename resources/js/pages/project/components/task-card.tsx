import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TaskType } from "@/types/data/task";
import { useDraggable } from "@dnd-kit/react";

export function TaskCard({ task }: { task: TaskType }) {
    const { ref } = useDraggable({
        id: task.id,
    });
    
    return (
        <Card
            ref={ref}
            className="bg-background/50 cursor-grab w-full"
            key={task.id}
        >
            <CardContent className="flex flex-col gap-2 min-w-0">
                <CardTitle>{task.title}</CardTitle>
                <div
                    dangerouslySetInnerHTML={{
                        __html: task.description,
                    }}
                    className="text-xs w-full line-clamp-3 break-words [&_p]:m-0 [&_pre]:m-0 [&_pre]:whitespace-pre-wrap"
                />
                <div className="flex items-start flex-wrap gap-1">
                    {task.label.map((label) => (
                        <Badge key={label} className="rounded-full text-xs">
                            {label}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
