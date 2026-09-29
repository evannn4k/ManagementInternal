import { Button } from "@/components/ui/button";
import { Download, Plus, ShieldCheck } from "lucide-react";
import { ProjectSectionCard } from "./components/project-section-card";
import { ProjectToolbar } from "./components/project-toolbar";
import { LaravelPagination } from "@/types/paginate";
import { CardData, ProjectGridType, ProjectType } from "@/types/data/project";
import { PaginationPage } from "@/components/pagination-page";
import { index as userIndex } from "@/actions/App/Http/Controllers/User/ViewUserController";
import userDelete from "@/actions/App/Http/Controllers/User/DeleteUserController";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { index as user } from "@/routes/user";
import { useModal } from "@/hooks/use-modal";
import UserForm from "./components/project-form";
import { Role } from "@/types/data/role";
import { DeleteAlert } from "@/components/delete-alert";
import { can } from "@/lib/middleware";
import { index as projectIndex } from "@/routes/project";
import { ProjectGrid } from "./components/project-grid";
import ProjectForm from "./components/project-form";
import { UserWithRole } from "@/types/data/user";
import { ProjectDetailData } from "./components/project-detail-data";
import { TaskKanban } from "./components/task-kanban";
import TaskForm from "./components/task-form";

export default function ProjectPage({ project }: { project: ProjectType }) {
    const modal = useModal();

    return (
        <>
            <Head title="Project" />
            <TaskForm modal={modal} project={project} />
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold text-2xl md:text-3xl">
                            {project.name}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => modal.openCreate()}>
                            <Plus /> Tambah Tugas
                        </Button>
                    </div>
                </header>
                <ProjectDetailData project={project} />
                <TaskKanban statuses={project.statuses} />
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
            title: props?.project?.name ?? "",
            href: "#",
        },
    ],
});
