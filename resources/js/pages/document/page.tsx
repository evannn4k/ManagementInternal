import { LaravelPagination } from "@/types/paginate";
import { PaginationPage } from "@/components/pagination-page";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import ResourceDocument from "./components/document-resource";
import { DocumentType } from "@/types/data/document";
import { index as documentIndex } from "@/routes/document";

export default function ProjectPage({
    data,
}: {
    data: LaravelPagination<DocumentType>;
}) {
    const [query, setQuery] = useState<{
        search: string;
        role: string;
        status: string;
        per_page: number;
    }>();

    const url = documentIndex.url();

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
            <Head title="Project" />
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold text-2xl md:text-3xl">
                            Lampiran Dokuumemn & Assets
                        </h1>
                        <p>
                            Arsipkan, kelola, dan unduh seluruh file serta
                            lampiran penting yang terhubung ke berbagai modul
                            sistem.
                        </p>
                    </div>
                </header>
                <ResourceDocument
                    documents={data.data}
                    title="Lampiran Dokumen & Assets"
                    column={5}
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

ProjectPage.layout = {
    breadcrumbs: [
        {
            title: "Document",
            href: documentIndex(),
        },
    ],
};
