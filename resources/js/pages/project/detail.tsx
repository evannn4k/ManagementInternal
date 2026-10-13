import { Button } from "@/components/ui/button";
import { Activity, PackageOpen, Plus, SquareKanban, Users } from "lucide-react";
import { ProjectType } from "@/types/data/project";
import { Head, router } from "@inertiajs/react";
import { useModal } from "@/hooks/use-modal";
import { DeleteAlert } from "@/components/delete-alert";
import { index as projectIndex } from "@/routes/project";
import { ProjectDetailData } from "./components/project-detail-data";
import { TaskKanban } from "./components/task-kanban";
import TaskForm from "../task/components/task-form";
import ProjectStatusForm from "./components/project-status-form";
import deleteTask from "@/actions/App/Http/Controllers/Task/DeleteTaskController";
import deleteStatusProject from "@/actions/App/Http/Controllers/Project/DeleteStatusProjectController";
import { ProjectDetailToolbar } from "./components/project-detail-toolbar";
import { detail as projectDetail } from "@/actions/App/Http/Controllers/Project/ViewProjectController";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import { Card } from "@/components/ui/card";
import ProjectTeam from "./components/project-team";
import { UserWithRole } from "@/types/data/user";
import { Separator } from "@/components/ui/separator";

export default function ProjectPage({
    project,
    users,
}: {
    project: ProjectType;
    users: UserWithRole[];
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
                <Tabs defaultValue="kanban">
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
                        <Card className="bg-muted/50 gap-4">
                            <ProjectDetailToolbar
                                url={url}
                                project={project}
                                updateQuery={updateQuery}
                            />
                            <Separator />
                            {project.statuses
                                .flatMap((status) => {
                                    return status.tasks.length;
                                })
                                .reduce((total, task) => total + task) > 0 ? (
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
                    </TabsContent>
                    <TabsContent value="team">
                        <ProjectTeam
                            teams={project.teams}
                            users={users}
                            projectId={project.id}
                        />
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
