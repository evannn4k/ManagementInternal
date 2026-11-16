import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Download, Eye, File, FileXCorner, MoreVertical, FileUp, Trash2 } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { DeleteAlert } from "@/components/delete-alert";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteMethod, download } from "@/routes/document";
import { router } from "@inertiajs/react";
import DocumentForm from "./document-form";
import { DocumentDetailDialog } from "./document-detail";
import { DocumentType } from "@/types/data/document";
import React from "react";

interface ResourceDocumentProps {
    documentableId?: string | number;
    documentableType?: string;
    documents: DocumentType[];
    title?: string | React.ReactNode;
    column?: number
}

export default function ResourceDocument({
    documentableId,
    documentableType,
    documents,
    title = "Dokumen",
    column = 5,
}: ResourceDocumentProps) {
    const modal = useModal();

    const handleDownloadDocument = (document: DocumentType) => {
        window.location.href = download.url(document);
    };

    const handleDeleteDocument = (id: string | number) => {
        router.delete(deleteMethod(String(id)), { preserveScroll: true, preserveState: true });
    };

    const gridCols: Record<number, string> = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
    }

    return (
        <>
            <DocumentForm
                modal={modal}
                documentable_id={documentableId}
                documentable_type={documentableType}
            />
            <DeleteAlert
                modal={modal}
                title="Hapus dokumen"
                description="Dokumen yang telah dihapus tidak dapat dikembalikan."
                handleDelete={handleDeleteDocument}
            />
            <DocumentDetailDialog modal={modal} handleDownloadDocument={handleDownloadDocument} />

            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardAction>
                        <Button size="sm" variant="secondary" className="text-primary" onClick={() => modal.openCreate()}>
                            <FileUp /> Unggah Dokumen
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {documents?.length > 0 ? (
                        <div className={`grid grid-cols-1 ${gridCols[column]} gap-4`}>
                            {documents.map((document) => (
                                <Card
                                    className="rounded-2xl cursor-pointer hover:border-primary/50 transition-colors"
                                    key={document.id}
                                    onClick={() => modal.openModal("detail", document)}
                                >
                                    <CardHeader>
                                        <div className="flex">
                                            <div className="bg-primary/20 rounded-lg border border-primary/30 text-primary p-2">
                                                <File className="size-6" />
                                            </div>
                                        </div>
                                        <CardAction>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8"
                                                    >
                                                        <MoreVertical className="size-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDownloadDocument(document);
                                                        }}
                                                    >
                                                        <Download />
                                                        Download
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            modal.openModal("detail", document);
                                                        }}
                                                    >
                                                        <Eye />
                                                        Lihat
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            modal.openDelete(document.id);
                                                        }}
                                                        variant="destructive"
                                                    >
                                                        <Trash2 />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </CardAction>
                                    </CardHeader>

                                    <CardContent>
                                        <CardTitle className="text-sm line-clamp-1">{document.file_name}</CardTitle>
                                        <CardDescription className="text-xs">
                                            <span className="uppercase">{document.mime_type}</span> {" - "}
                                            {(document.file_size / (1024 * 1024)).toFixed(1)} MB
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <FileXCorner />
                                </EmptyMedia>
                                <EmptyTitle>Belum ada dokumen</EmptyTitle>
                                <EmptyDescription>
                                    Tambahkan dokumen pertama Anda sekarang.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Button onClick={() => modal.openCreate()} size="sm">
                                    <FileUp className="size-4" /> Unggah Dokumen
                                </Button>
                            </EmptyContent>
                        </Empty>
                    )}
                </CardContent>
            </Card>
        </>
    );
}