import { Head } from "@inertiajs/react";
import { index as projectIndex } from "@/routes/project";
import { TaskType } from "@/types/data/task";
import { PenSquare, Text } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import TaskForm from "./components/task-form";
import { useModal } from "@/hooks/use-modal";
import { TaskDetailData } from "./components/task-detail-data";
import { SubTask } from "./components/sub-task";

export default function ProjectPage({ task }: { task: TaskType }) {
    const modal = useModal();

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">
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
                        <SubTask task={task}/>
                    </div>
                    <TaskDetailData task={task}/>
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
