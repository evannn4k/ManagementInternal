import { Button } from "@/components/ui/button";
import { Download, Plus, ShieldCheck } from "lucide-react";
import { ProjectSectionCard } from "./components/project-section-card";
import { ProjectToolbar } from "./components/project-toolbar";
import { LaravelPagination } from "@/types/paginate";
import { CardData, ProjectGridType } from "@/types/data/project";
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

export default function ProjectPage({
    data,
    cardData,
    users,
}: {
    data: LaravelPagination<ProjectGridType>;
    cardData: CardData;
    users: UserWithRole[];
}) {
    const [query, setQuery] = useState<{
        search: string;
        status: string;
        per_page: number;
    }>();
    const { url } = projectIndex();
    const modal = useModal();

    const updateQuery = (params: Record<string, any>) => {
        const updated = { ...query, ...params };

        setQuery(updated as any);
        const urlQuery = projectIndex({ query: updated });

        router.get(
            urlQuery.url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    // const handleDelete = (id: number) => {
    //     router.delete(userDelete({ id: id }));
    // };

    // const tableHead = [
    //     { label: "name" },
    //     { label: "email" },
    //     { label: "role" },
    //     { label: "status" },
    //     { label: "terakhir login" },
    //     { label: "aksi", className: "text-end" },
    // ];

    cardData = {
        total_project: 100,
        running_project: 80,
        at_risk_project: 20,
        completed_project: 10,
    };

    return (
        <>
            <Head title="Project" />
            <ProjectForm modal={modal} users={users} />
            {/* <DeleteAlert
                modal={modal}
                title="Hapus data user"
                description="Data user yang telah dihapus dapat dikembalikan."
                handleDelete={handleDelete}
            /> */}
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold text-2xl md:text-3xl">
                            Daftar Proyek
                        </h1>
                        <p>
                            Kelola dan pantau seluruh inisiatif rekayasa, status
                            sprint, performa SLA, dan alokasi tim dalam
                            repositori terpadu.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => console.log("hello world")}
                        >
                            <Download /> Ekspor Proyek
                        </Button>
                        <Button onClick={() => modal.openCreate()}>
                            <Plus /> Proyek Baru
                        </Button>
                    </div>
                </header>
                <ProjectSectionCard cardData={cardData} />
                <ProjectToolbar url={url} updateQuery={updateQuery} />
                <ProjectGrid projects={data.data} />
                {/* <PaginationPage
                    updateQuery={updateQuery}
                    links={data.links}
                    meta={data.meta}
                /> */}
            </div>
        </>
    );
}

ProjectPage.layout = {
    breadcrumbs: [
        {
            title: "Project",
            href: projectIndex(),
        },
    ],
};
