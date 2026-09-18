import { Button } from "@/components/ui/button";
import { Plus, ShieldCheck } from "lucide-react";
import { UserSectionCard } from "./components/user-section-card";
import { UserToolbar } from "./components/user-toolbar";
import { UserTable } from "./components/user-table";
import { LaravelPagination } from "@/types/paginate";
import { UserTableType } from "@/types/data/user";
import { PaginationPage } from "@/components/pagination-page";
import { index as userIndex } from "@/actions/App/Http/Controllers/User/ViewUserController";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function UserPage({
    data,
}: {
    data: LaravelPagination<UserTableType>;
}) {
    const [query, setQuery] = useState<{
        search: string;
        role: string;
        status: string;
        per_page: number;
    }>();

    const { url } = userIndex();

    const updateQuery = (params: Record<string, any>) => {
        const updated = { ...query, ...params };

        setQuery(updated as any);
        const urlQuery = userIndex({ query: updated });

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

    const tableHead = [
        { label: "name" },
        { label: "email" },
        { label: "role" },
        { label: "status" },
        { label: "terakhir login" },
        { label: "aksi", className: "text-end" },
    ];

    return (
        <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6">
            <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center text-sm">
                        <ShieldCheck size="24" /> SISTEM AKSES TERPUSAT
                    </div>
                    <h1 className="font-semibold text-2xl md:text-3xl">
                        Manajemen Pengguna & Akses
                    </h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Possimus eligendi quas nisi at veritatis sapiente?
                    </p>
                </div>
                <div className="">
                    <Button>
                        <Plus /> Tambah Pengguna
                    </Button>
                </div>
            </header>
            <UserSectionCard />
            <UserToolbar url={url} updateQuery={updateQuery} />
            <UserTable data={data.data} tableHead={tableHead} />
            <PaginationPage
                updateQuery={updateQuery}
                links={data.links}
                meta={data.meta}
            />
        </div>
    );
}
