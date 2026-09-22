import { Button } from "@/components/ui/button";
import { Plus, ShieldCheck } from "lucide-react";
import { UserSectionCard } from "./components/user-section-card";
import { UserToolbar } from "./components/user-toolbar";
import { UserTable } from "./components/user-table";
import { LaravelPagination } from "@/types/paginate";
import { CardData, UserTableType } from "@/types/data/user";
import { PaginationPage } from "@/components/pagination-page";
import { index as userIndex } from "@/actions/App/Http/Controllers/User/ViewUserController";
import userDelete from "@/actions/App/Http/Controllers/User/DeleteUserController";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { index as user } from "@/routes/user";
import { useModal } from "@/hooks/use-modal";
import UserForm from "./components/user-form";
import { Role } from "@/types/data/role";
import { DeleteAlert } from "@/components/delete-alert";

export default function UserPage({
    data,
    cardData,
    roles,
}: {
    data: LaravelPagination<UserTableType>;
    cardData: CardData;
    roles: Role[];
}) {
    const [query, setQuery] = useState<{
        search: string;
        role: string;
        status: string;
        per_page: number;
    }>();
    const { url } = userIndex();
    const modal = useModal();

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

    const handleDelete = (id: number) => {
        router.delete(userDelete({ id: id }));
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
        <>
            <Head title="User" />
            <UserForm roles={roles} modal={modal} />
            <DeleteAlert
                modal={modal}
                title="Hapus data user"
                description="Data user yang telah dihapus dapat dikembalikan."
                handleDelete={handleDelete}
            />
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
                            elit. Possimus eligendi quas nisi at veritatis
                            sapiente?
                        </p>
                    </div>
                    <Button onClick={() => modal.openCreate()}>
                        <Plus /> Tambah Pengguna
                    </Button>
                </header>
                <UserSectionCard cardData={cardData} />
                <UserToolbar url={url} updateQuery={updateQuery} />
                <UserTable
                    modal={modal}
                    data={data.data}
                    tableHead={tableHead}
                />
                <PaginationPage
                    updateQuery={updateQuery}
                    links={data.links}
                    meta={data.meta}
                />
            </div>
        </>
    );
}

UserPage.layout = {
    breadcrumbs: [
        {
            title: "User",
            href: user(),
        },
    ],
};
