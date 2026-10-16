import { Head, router, usePage } from "@inertiajs/react";
import { dashboard } from "@/routes";
import { User } from "lucide-react";
import { DashboardSectionCard } from "./components/dashboard-section-card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
    AssignedDistributionType,
    CardData,
    StatusDistributionType,
} from "@/types/data/dashboard";
import { DashboardSectionTask } from "./components/dashboard-section-task";
import { TaskType } from "@/types/data/task";
import DashboardSummaryData from "./components/dashboard-summary-data";
import { LaravelPagination } from "@/types/paginate";
import { useState } from "react";
import { dashboard as DashboardIndex } from "@/routes";

export default function Dashboard({
    cardData,
    overdue,
    thisWeek,
    pending,
    statusDistribution,
    assignedDistribution,
    overdueTasks,
}: {
    cardData: CardData;
    overdue: TaskType[];
    thisWeek: TaskType[];
    pending: TaskType[];
    statusDistribution?: StatusDistributionType;
    assignedDistribution?: AssignedDistributionType;
    overdueTasks?: LaravelPagination<{ title: string; due_date: string }>;
}) {
    const { auth } = usePage().props;

    const { url } = DashboardIndex();
    const [query, setQuery] = useState<{}>();

    const updateQuery = (params: Record<string, any>) => {
        const updated = { ...query, ...params };

        setQuery(updated as any);

        router.get(url, updated, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">
                <Card className="bg-muted/50">
                    <CardContent>
                        <header className="w-full md:max-w-3xl flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                            <div className="flex flex-col gap-2">
                                <p className="capitalize flex items-center gap-2">
                                    <span className="font-semibold flex items-center gap-2">
                                        <User /> {auth.user.role}
                                    </span>
                                    -
                                    <span>
                                        {auth.user.position
                                            ? auth.user.position
                                            : "Tanpa Posisi"}
                                    </span>
                                </p>
                                <h1 className="font-semibold text-2xl md:text-3xl">
                                    Selamat datang kembali, {auth.user.name}
                                </h1>
                                <p className="teks-xs">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Impedit dolorum rerum
                                    exercitationem delectus sed perspiciatis.
                                </p>
                            </div>
                        </header>
                    </CardContent>
                </Card>
                <div className="flex flex-col gap-4">
                    <CardTitle>Personal Data</CardTitle>
                    <div className="flex flex-col gap-4 p-0">
                        <DashboardSectionCard cardData={cardData} />
                        <DashboardSectionTask
                            overdue={overdue}
                            thisWeek={thisWeek}
                            pending={pending}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <CardTitle>Ringkasan Data</CardTitle>
                    <DashboardSummaryData
                        statusDistribution={statusDistribution}
                        assignedDistribution={assignedDistribution}
                        overdueTasks={overdueTasks}
                    />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboard(),
        },
    ],
};
