import { router } from "@inertiajs/react";
import { useState } from "react";
import { LaravelPagination } from "@/types/paginate";
import { ActivityType } from "@/types/data/activity";
import { PaginationPage } from "@/components/pagination-page";
import { ActivityTable } from "../activity/components/activity-table";
import { ActivityToolbar } from "../activity/components/activity-toolbar";
import ProjectDetailLayout from "./project-detail-layout";
import { trashed as detailTrashed } from "@/routes/project/detail";
import { ProjectType } from "@/types/data/project";
import { TaskTable } from "../task/components/task-table";
import { TaskToolbar } from "../task/components/task-toolbar";
import { Card } from "@/components/ui/card";
import { TaskType } from "@/types/data/task";

export default function ProjectDetailActivity({
    project,
    tasks,
}: {
    project: ProjectType;
    tasks: LaravelPagination<TaskType>;
}) {
    const { url } = detailTrashed(project.id);
    const [query, setQuery] = useState<{
        [key: string]: any;
    }>();

    const updateQuery = (params: Record<string, any>) => {
        const updated = { ...query, ...params };

        setQuery(updated as any);

        router.get(url, updated, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const tableHead = [
        { label: "judul", className: "w-full" },
        { label: "proyek" },
        { label: "prioritas" },
        { label: "status" },
        { label: "tenggat waktu" },
    ];

    return (
        <>
            <Card className="bg-muted/50 gap-4 pb-0">
                <TaskToolbar url={url} updateQuery={updateQuery} />
                <TaskTable
                    tableHead={tableHead}
                    data={tasks.data}
                    project={project}
                />
            </Card>
            {tasks.data.length > 0 && (
                <PaginationPage
                    updateQuery={updateQuery}
                    links={tasks.links}
                    meta={tasks.meta}
                />
            )}
        </>
    );
}

ProjectDetailActivity.layout = (page: any) => {
    const project = page.project ?? page.props.project;

    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};
