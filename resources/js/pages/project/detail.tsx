import { Button } from "@/components/ui/button";
import { Activity, Plus, SquareKanban, Users } from "lucide-react";
import { ProjectType } from "@/types/data/project";
import { Head, router } from "@inertiajs/react";
import { useModal } from "@/hooks/use-modal";
import { DeleteAlert } from "@/components/delete-alert";
import { index as projectIndex } from "@/routes/project";
import { ProjectDetailData } from "./components/project-detail-data";
import { TaskKanban } from "./components/task-kanban";
import TaskForm from "./components/task-form";
import ProjectStatusForm from "./components/project-status-form";
import deleteTask from "@/actions/App/Http/Controllers/Task/DeleteTaskController";
import deleteStatusProject from "@/actions/App/Http/Controllers/Project/DeleteStatusProjectController";
import { ProjectDetailToolbar } from "./components/project-detail-toolbar";
import { detail as projectDetail } from "@/actions/App/Http/Controllers/Project/ViewProjectController";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectPage({ project }: { project: ProjectType }) {
    const taskModal = useModal();
    const projectStatusModal = useModal();
    const [query, setQuery] = useState<{
        search: string;
        status: string;
        per_page: number;
    }>();

    const { url } = projectDetail({ id: project.id });

    const updateQuery = (params: Record<string, any>) => {
        const updated = { ...query, ...params };

        setQuery(updated as any);

        router.get(
            url,
            { query: updated },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
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
            <Head title="Project" />
            <TaskForm modal={taskModal} project={project} />
            <ProjectStatusForm modal={projectStatusModal} />
            <DeleteAlert
                modal={taskModal}
                title="Hapus data tugas"
                description="Data tugas yang telah dihapus dapat dikembalikan."
                handleDelete={handleDeleteTask}
            />
            <DeleteAlert
                modal={projectStatusModal}
                title="Hapus data status"
                description="Data status yang telah dihapus dapat dikembalikan."
                handleDelete={handleDeleteProjectStatus}
            />
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold text-2xl md:text-3xl">
                            {project.name}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => taskModal.openCreate()}>
                            <Plus /> Tambah Tugas
                        </Button>
                    </div>
                </header>
                <ProjectDetailData project={project} />
                <Tabs defaultValue="kanban" className="gap-4">
                    <TabsList className="bg-muted/50 p-2">
                        <TabsTrigger value="kanban">
                            <SquareKanban /> Kanban Board
                        </TabsTrigger>
                        <TabsTrigger value="team">
                            <Users /> Anggota & Team
                        </TabsTrigger>
                        <TabsTrigger value="activity">
                            <Activity /> Aktivitas
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent className="flex flex-col gap-4" value="kanban">
                        <ProjectDetailToolbar
                            url={url}
                            updateQuery={updateQuery}
                        />
                        <TaskKanban
                            statuses={project.statuses}
                            taskModal={taskModal}
                            projectStatusModal={projectStatusModal}
                        />
                    </TabsContent>
                    <TabsContent value="team">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Harum temporibus laborum fugit, ea perspiciatis
                        labore culpa? Itaque omnis tempora quod, ipsum expedita
                        eos at nobis, architecto adipisci, voluptatum quis non?
                    </TabsContent>
                    <TabsContent value="activity">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non corporis perspiciatis et architecto mollitia ut
                        eveniet aut dolorum. Possimus, beatae dolore.
                        Voluptatibus omnis dolor aliquid incidunt molestiae ab!
                        Ipsa, porro.
                    </TabsContent>
                </Tabs>
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
