import {
    Activity,
    FileText,
    MessagesSquare,
    RefreshCw,
    RotateCcw,
    SquareKanban,
    Trash,
    Users,
} from "lucide-react";
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
    document as detailDocument,
    comment as detailComment,
    trashed as detailTrashed,
} from "@/routes/project/detail";
import { index as detailSprint } from "@/routes/project/sprint";
import { detail as detailProject } from "@/routes/project";
import { can } from "@/lib/middleware";

export default function ProjectDetailLayout({
    children,
    project,
}: {
    children: React.ReactNode;
    project: ProjectType;
}) {
    const { component } = usePage();

    const canViewDocument: boolean = can([
        "document.view.all",
        "document.view.own",
    ]);

    const canViewComment: boolean = can("comment.view");
    const canViewActivity: boolean = can("activity.view");

    const handleChangeTab = (val: string) => {
        let url = detailProject(project.id).url;

        if (val == "project/detail-team") {
            url = detailTeam(project.id).url;
        } else if (val == "project/detail-sprint") {
            url = detailSprint(project.id).url;
        } else if (val == "project/detail-activity") {
            if (!canViewActivity) {
                return;
            }

            url = detailActivity(project.id).url;
        } else if (val == "project/detail-document") {
            if (!canViewDocument) {
                return;
            }

            url = detailDocument(project.id).url;
        } else if (val == "project/detail-comment") {
            if (!canViewComment) {
                return;
            }

            url = detailComment(project.id).url;
        } else if (val == "project/detail-trashed") {
            url = detailTrashed(project.id).url;
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
                <Tabs
                    value={component}
                    onValueChange={handleChangeTab}
                    className="rounded-xl overflow-hidden border w-full min-w-0"
                >
                    <TabsList
                        variant="line"
                        className="bg-muted/50 p-2 w-full max-w-full min-w-0 flex items-center justify-start overflow-x-auto no-scrollbar"
                    >
                        <TabsTrigger
                            className="whitespace-nowrap flex-shrink-0"
                            value="project/detail"
                        >
                            <SquareKanban /> Kanban Board
                        </TabsTrigger>
                        <TabsTrigger
                            className="whitespace-nowrap flex-shrink-0"
                            value="project/detail-sprint"
                        >
                            <RefreshCw /> Sprint
                        </TabsTrigger>
                        <TabsTrigger
                            className="whitespace-nowrap flex-shrink-0"
                            value="project/detail-team"
                        >
                            <Users /> Anggota & Team
                        </TabsTrigger>
                        {canViewActivity && (
                            <TabsTrigger
                                className="whitespace-nowrap flex-shrink-0"
                                value="project/detail-activity"
                            >
                                <Activity /> Aktivitas
                            </TabsTrigger>
                        )}
                        {canViewDocument && (
                            <TabsTrigger
                                className="whitespace-nowrap flex-shrink-0"
                                value="project/detail-document"
                            >
                                <FileText /> Lampiran Dokumen
                            </TabsTrigger>
                        )}
                        {canViewComment && (
                            <TabsTrigger
                                className="whitespace-nowrap flex-shrink-0"
                                value="project/detail-comment"
                            >
                                <MessagesSquare /> Komentar
                            </TabsTrigger>
                        )}
                        <TabsTrigger
                            value="project/detail-trashed"
                            className="!text-red-500"
                        >
                            <Trash /> Tugas dihapus
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                {children}
            </div>
        </AppLayout>
    );
}
