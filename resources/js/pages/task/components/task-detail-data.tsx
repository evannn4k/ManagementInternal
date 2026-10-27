import { Link } from "@inertiajs/react";
import { TaskType } from "@/types/data/task";
import { CalendarDays, FileText, Users } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { Item, ItemContent } from "@/components/ui/item";
import { detail as userDetail } from "@/routes/user";

export function TaskDetailData({ task }: { task: TaskType }) {
    const metaData = [
        {
            title: "Status",
            content: (
                <CardTitle className="capitalize">{task.status.name}</CardTitle>
            ),
        },
        {
            title: "Prioritas",
            content: (
                <Badge
                    className={cn("capitalize text-xs rounded-full", {
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
            ),
        },
        {
            title: "Tenggat Waktu",
            content: (
                <div className="flex gap-2 items-center">
                    <CalendarDays className="size-4" />{" "}
                    {formatDate(task.due_date)}
                </div>
            ),
        },
        {
            title: "Label & Tags",
            content: (
                <div className="flex flex-wrap gap-1">
                    {task.label.map((label) => (
                        <Badge key={label} className="rounded-full text-xs">
                            {label}
                        </Badge>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className="col-span-1 flex flex-col gap-6">
            <Card className="bg-muted/50">
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                        <FileText />
                        Data Tugas
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {metaData.map((data) => (
                        <div key={data.title} className="flex flex-col gap-1">
                            <CardDescription className="text-xs">
                                {data.title}
                            </CardDescription>
                            <Item variant="muted" className="p-3 rounded-xl">
                                <ItemContent>{data.content}</ItemContent>
                            </Item>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="bg-muted/50">
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                        <Users />
                        Team Yang Ditugaskan
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {task.assigned.map((user, i) => (
                        <Item
                            variant="muted"
                            className="p-2"
                            key={user.id}
                            asChild
                        >
                            <Link href={userDetail(user.id).url}>
                                <ItemContent className="p-0 flex flex-row justify-start gap-2">
                                    <span>{i + 1}.</span>
                                    <div className="flex-1 flex items-center justify-between gap-2">
                                        <span>{user.name}</span>
                                        <span>{user.position}</span>
                                    </div>
                                </ItemContent>
                            </Link>
                        </Item>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
