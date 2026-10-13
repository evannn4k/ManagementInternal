import { Head, router, useForm } from "@inertiajs/react";
import { index as projectIndex } from "@/routes/project";
import { TaskType } from "@/types/data/task";
import {
    CalendarDays,
    FileText,
    PenSquare,
    Plus,
    Text,
    Trash,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import TaskForm from "./components/task-form";
import { useModal } from "@/hooks/use-modal";

export default function ProjectPage({ task }: { task: TaskType }) {
    const modal = useModal();

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
        <>
            <Head title="Project" />
            <TaskForm modal={modal} project={task.status.project} />
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold text-2xl md:text-3xl">
                            {task.title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => modal.openEdit(task)}>
                            <PenSquare /> Edit
                        </Button>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <Card className="bg-muted/50">
                            <CardHeader className="flex items-center gap-2 border-b">
                                <CardTitle className="flex items-center gap-2">
                                    <Text /> Deskripsi Teknis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="prose dark:prose-invert max-w-full break-words [&_p]:m-0 [&_pre]:m-0 [&_pre]:whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{
                                        __html: task.description,
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>
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
                                    <div
                                        key={data.title}
                                        className="flex flex-col gap-1"
                                    >
                                        <CardDescription className="text-xs">
                                            {data.title}
                                        </CardDescription>
                                        <Item
                                            variant="muted"
                                            className="p-3 rounded-xl"
                                        >
                                            <ItemContent>
                                                {data.content}
                                            </ItemContent>
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
                                    >
                                        <ItemContent className="p-0 flex flex-row justify-start gap-2">
                                            <span>{i + 1}.</span>
                                            <div className="flex-1 flex items-center justify-between gap-2">
                                                <span>{user.name}</span>
                                                <span>{user.position}</span>
                                            </div>
                                        </ItemContent>
                                    </Item>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

ProjectPage.layout = (props: any) => ({
    breadcrumbs: [
        {
            title: "Project",
            href: projectIndex(),
        },
        {
            title: props?.task?.status?.project?.name ?? "",
            href: "/project/" + props?.task?.status?.project?.id,
        },
        {
            title: props?.task?.title ?? "",
            href: "#",
        },
    ],
});
