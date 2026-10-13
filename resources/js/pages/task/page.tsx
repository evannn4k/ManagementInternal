import { Button } from "@/components/ui/button";
import { Download, Plus, View } from "lucide-react";
import { LaravelPagination } from "@/types/paginate";
import {
    CardData,
    ProjectGridType,
    ProjectStatusType,
} from "@/types/data/project";
import { PaginationPage } from "@/components/pagination-page";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { useModal } from "@/hooks/use-modal";
import { index as taskIndex } from "@/routes/task";
import { UserWithRole } from "@/types/data/user";
import { TaskSectionCard } from "./components/task-section-card";
import { TaskTable } from "./components/task-table";
import { TaskToolbar } from "./components/task-toolbar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskForm from "./components/task-form";
import { deleteMethod as deleteTask } from "@/routes/task";
import { DeleteAlert } from "@/components/delete-alert";

export default function TaskPage({
    data,
    cardData,
    users,
    projects,
}: {
    data: LaravelPagination<ProjectGridType>;
    cardData: CardData;
    users: UserWithRole[];
    projects: any[];
}) {
    const [query, setQuery] = useState<{
        search: string;
        status: string;
        per_page: number;
    }>();
    const { url } = taskIndex();
    const modal = useModal();

    const updateQuery = (params: Record<string, any>) => {
        const updated = { ...query, ...params };

        setQuery(updated as any);

        router.get(url, updated, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    cardData = {
        total_project: 100,
        running_project: 80,
        at_risk_project: 20,
        completed_project: 10,
    };

    const tableHead = [
        { label: "judul", className: "w-full" },
        { label: "proyek" },
        { label: "prioritas" },
        { label: "status" },
        { label: "tenggat waktu" },
        { label: "aksi", className: "text-end" },
    ];

    const handleChangeTab = (val: string) => {
        updateQuery({ tabs: val });
    };

    const handleDelete = (id: any) => {
        router.delete(deleteTask({ id: id }).url, {
            onSuccess: () => {
                // router.reload({ only: ["project"] });
            },
        });
    };

    return (
        <>
            <Head title="Project" />
            <TaskForm modal={modal} projects={projects} />
            <DeleteAlert
                modal={modal}
                title="Hapus tugas"
                description="Tugas yang telah dihapus dapat dikembalikan."
                handleDelete={handleDelete}
            />
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold text-2xl md:text-3xl">
                            Daftar Tugas
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Alias deserunt doloribus architecto eligendi,
                            voluptatem sint.
                        </p>
                    </div>
                    <Button onClick={() => modal.openCreate()}>
                        <Plus /> Proyek Baru
                    </Button>
                </header>
                <TaskSectionCard cardData={cardData} />

                <Tabs defaultValue="all" onValueChange={handleChangeTab}>
                    <TabsList className="bg-muted/50 p-2">
                        <TabsTrigger value="all">Semua</TabsTrigger>
                        <TabsTrigger value="due">Terlambat</TabsTrigger>
                        <TabsTrigger value="this_week">Minggu Ini</TabsTrigger>
                    </TabsList>
                    <Card className="bg-muted/50 gap-4 pb-0">
                        <TaskToolbar
                            url={url}
                            updateQuery={updateQuery}
                            projects={projects}
                        />
                        <TaskTable
                            tableHead={tableHead}
                            data={data.data}
                            modal={modal}
                        />
                    </Card>
                </Tabs>
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

TaskPage.layout = {
    breadcrumbs: [
        {
            title: "Task",
            href: taskIndex(),
        },
    ],
};
