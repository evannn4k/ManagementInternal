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
                </div>
            </CardHeader>
            {task.due_date && (
                <CardContent className="min-w-0">
                    <div className="text-xs text-muted-foreground">
                        Target: {task.due_date}
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
