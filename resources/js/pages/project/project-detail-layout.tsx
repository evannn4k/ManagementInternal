import { Activity, SquareKanban, Users } from "lucide-react";
import { ProjectType } from "@/types/data/project";
import { Head, router, usePage } from "@inertiajs/react";
import { index as projectIndex } from "@/routes/project";
import { ProjectDetailData } from "./components/project-detail-data";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import {
    team as detailTeam,
    activity as detailActivity,
} from "@/routes/project/detail";
import { detail as detailProject } from "@/routes/project";

export default function ProjectDetailLayout({
    children,
    project,
}: {
    children: React.ReactNode;
    project: ProjectType;
}) {
    const { component } = usePage();

    const handleChangeTab = (val: string) => {
        let url = detailProject(project.id).url;

        if (val == "project/detail-team") {
            url = detailTeam(project.id).url;
        } else if (val == "project/detail-activity") {
            url = detailActivity(project.id).url;
        }

        router.get(url);
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: "Project",
                    href: projectIndex(),
                },
                {
                    title: project?.name ?? "",
                    href: "#",
                },
            ]}
        >
            <Head title="Project" />
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex flex-col gap-2">
                    <h1 className="font-semibold text-2xl md:text-3xl">
                        {project.name}
                    </h1>
                </header>
                <ProjectDetailData project={project} />
                <Tabs value={component} onValueChange={handleChangeTab}>
                    <TabsList className="bg-muted/50 p-2 border">
                        <TabsTrigger value="project/detail">
                            <SquareKanban /> Kanban Board
                        </TabsTrigger>
                        <TabsTrigger value="project/detail-team">
                            <Users /> Anggota & Team
                        </TabsTrigger>
                        <TabsTrigger value="project/detail-activity">
                            <Activity /> Aktivitas
                        </TabsTrigger>
                    </TabsList>
                    {children}
                </Tabs>
            </div>
        </AppLayout>
    );
}
