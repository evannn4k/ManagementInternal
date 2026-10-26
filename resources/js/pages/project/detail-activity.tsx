import { router } from "@inertiajs/react";
import { useState } from "react";
import { LaravelPagination } from "@/types/paginate";
import { ActivityType } from "@/types/data/activity";
import { PaginationPage } from "@/components/pagination-page";
import { ActivityTable } from "../activity/components/activity-table";
import { ActivityToolbar } from "../activity/components/activity-toolbar";
import ProjectDetailLayout from "./project-detail-layout";
import { activity as detailActivity } from "@/routes/project/detail";
import { ProjectType } from "@/types/data/project";

export default function ProjectDetailActivity({
    project,
    data,
}: {
    project: ProjectType;
    data: LaravelPagination<ActivityType>;
}) {
    const { url } = detailActivity(project.id);
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
        { label: "pengguna" },
        { label: "tipe" },
        { label: "target" },
        { label: "waktu" },
        { label: "alamat ip" },
        { label: "" },
    ];

    return (
        <>
            <div className="flex flex-col gap-4">
                <ActivityToolbar
                    isProjectDetail={true}
                    query={query}
                    updateQuery={updateQuery}
                    url={url}
                />
                <ActivityTable
                    isProjectDetail={true}
                    tableHead={tableHead}
                    data={data.data}
                />
                {data.data.length > 0 && (
                    <PaginationPage
                        updateQuery={updateQuery}
                        links={data.links}
                        meta={data.meta}
                    />
                )}
            </div>
        </>
    );
}

ProjectDetailActivity.layout = (page: any) => {
    const project = page.project ?? page.props.project;

    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};
