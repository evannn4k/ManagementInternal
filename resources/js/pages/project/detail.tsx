import { ProjectType } from "@/types/data/project";
import ProjectDetailLayout from "./project-detail-layout";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { ProjectDetailToolbar } from "./components/project-detail-toolbar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TaskKanban } from "./components/task-kanban";
import { useModal } from "@/hooks/use-modal";
import { detail as projectDetail } from "@/routes/project";
import { deleteMethod as deleteTask } from "@/routes/task";
import { deleteMethod as deleteStatusProject } from "@/routes/project/status";
import TaskForm from "../task/components/task-form";
import { DeleteAlert } from "@/components/delete-alert";
import ProjectFormStatusEdit from "./components/project-form-status-edit";

export default function ProjectDetail({ project }: { project: ProjectType }) {
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
            <ProjectFormStatusEdit modal={projectStatusModal} />
            <DeleteAlert
                modal={taskModal}
                title="Hapus data tugas"
                description="Data tugas yang telah dihapus dapat di kembalikan."
                handleDelete={handleDeleteTask}
            />
            <DeleteAlert
                modal={projectStatusModal}
                title="Hapus data status"
                description="Data status yang telah dihapus dapat dikembalikan."
                handleDelete={handleDeleteProjectStatus}
            />
            <Card className="bg-muted/50 gap-4 pb-0">
                <ProjectDetailToolbar
                    url={url}
                    project={project}
                    updateQuery={updateQuery}
                />
                <Separator />
                <TaskKanban
                    statuses={project.statuses}
                    taskModal={taskModal}
                    projectStatusModal={projectStatusModal}
                />
            </Card>
        </>
    );
}

ProjectDetail.layout = (page: any) => {
    const project = page.project ?? page.props.project;

    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};
