import { Head, router } from "@inertiajs/react";
import { ActivitySectionCard } from "./components/activity-section-card";
import { ActivityToolbar } from "./components/activity-toolbar";
import { index as activityIndex } from "@/routes/activity";
import { useState } from "react";
import { ActivityTable } from "./components/activity-table";
import { LaravelPagination } from "@/types/paginate";
import { ActivityType, CardDataType } from "@/types/data/activity";
import { PaginationPage } from "@/components/pagination-page";

export default function ActivityPage({
    data,
    cardData,
}: {
    data: LaravelPagination<ActivityType>;
    cardData: CardDataType;
}) {
    const { url } = activityIndex();
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
        { label: "tabel target" },
        { label: "waktu" },
        { label: "alamat ip" },
        { label: "" },
    ];

    return (
        <>
            <Head title="Activity" />
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex flex-col gap-2 w-full md:max-w-4xl">
                    <h1 className="font-semibold text-2xl md:text-3xl">
                        Log Aktivitas Sistem (Audit Trail)
                    </h1>
                    <p className="">
                        Rekam jejak mutasi data real-time, perbandingan nilai
                        old_data {"->"} new_data (diff payload JSON),
                        klasifikasi event CRUD, serta jejak keamanan IP Address
                        host.
                    </p>
                </header>
                <ActivitySectionCard cardData={cardData} />
                <ActivityToolbar query={query} updateQuery={updateQuery} url={url} />
                <ActivityTable tableHead={tableHead} data={data.data} />
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
