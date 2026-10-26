import { ProjectType } from "@/types/data/project";
import ProjectDetailLayout from "./project-detail-layout";
import LayoutDetail from "./project-detail-layout";
import { ReactElement, ReactNode, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import type { PageProps } from "@inertiajs/core";
import { ProjectDetailToolbar } from "./components/project-detail-toolbar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TaskKanban } from "./components/task-kanban";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import { PackageOpen } from "lucide-react";
import { UserWithRole } from "@/types/data/user";
import { ActivityType } from "@/types/data/activity";
import { useModal } from "@/hooks/use-modal";
import { detail as projectDetail } from "@/routes/project";
import { deleteMethod as deleteTask } from "@/routes/task";
import { deleteMethod as deleteStatusProject } from "@/routes/project/status";
import { index as projectIndex } from "@/routes/project";
import TaskForm from "../task/components/task-form";
import ProjectStatusForm from "./components/project-status-form";
import { DeleteAlert } from "@/components/delete-alert";

export default function ProjectDetail({
    project,
}: {
    project: ProjectType;
}) {
    const taskModal = useModal();
    const projectStatusModal = useModal();
    const [query, setQuery] = useState<{
        search: string;
        team: string;
        task_view: string;
        priority: string;
        per_page: number;
    }>();

    const { url } = projectDetail({ id: project.id });

    const updateQuery = (params: Record<string, any>) => {
        const updated = { ...query, ...params };

        setQuery(updated as any);

        router.get(url, updated, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleDeleteTask = (id: any) => {
        router.delete(deleteTask({ id: id }).url, {
            onSuccess: () => {
                router.reload({ only: ["project"] });
            },
        });
    };

    const handleDeleteProjectStatus = (id: any) => {
        router.delete(deleteStatusProject({ id: id }).url, {
            onSuccess: () => {
                router.reload({ only: ["project"] });
            },
        });
    };
    
    return (
        <>
            <TaskForm modal={taskModal} project={project} />
            <ProjectStatusForm modal={projectStatusModal} />
            <DeleteAlert
                modal={taskModal}
                title="Hapus data tugas"
                description="Data tugas yang telah dihapus dapat dikembalikan."
                handleDelete={handleDeleteTask}
            />
            <Card className="bg-muted/50 gap-4 pb-0">
                <ProjectDetailToolbar
                    url={url}
                    project={project}
                    updateQuery={updateQuery}
                />
                <Separator />
                {project.statuses.some((status) => status.tasks.length > 0) ? (
                    <TaskKanban
                        statuses={project.statuses}
                        taskModal={taskModal}
                        projectStatusModal={projectStatusModal}
                    />
                ) : (
                    <Item>
                        <ItemContent>
                            <div className="text-center flex flex-col items-center justify-center gap-2 py-4">
                                <PackageOpen />
                                <ItemDescription>
                                    Belum ada tugas.
                                </ItemDescription>
                            </div>
                        </ItemContent>
                    </Item>
                )}
            </Card>
        </>
    );
}

ProjectDetail.layout = (page: any) => {
    const project = page.project ?? page.props.project;

    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};
