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
import { Link } from "@inertiajs/react";
import { FileText, MoreVertical, SquarePen, Trash2 } from "lucide-react";
import { detail as taskDetail } from "@/actions/App/Http/Controllers/Task/ViewTaskController";

export function DashboardTaskCard({ task }: { task: TaskType }) {
    return (
        <Card
            className="w-full z-10 cursor-pointer bg-background/50"
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
