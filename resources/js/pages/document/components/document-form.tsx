import { UseModalReturn } from "@/types/modal";
import { useForm } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    FieldDescription,
    FieldSet,
    FieldSeparator,
    FieldLabel,
    Field,
    FieldContent,
    FieldTitle,
} from "@/components/ui/field";
import { FileTextIcon, Save, Upload, XIcon } from "lucide-react";
import FormField from "@/components/form-field";
import { Spinner } from "@/components/ui/spinner";
import { create } from "@/routes/document";
import { useState } from "react";
import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
} from "@/components/ui/attachment";
import { Item, ItemContent } from "@/components/ui/item";
import { toast } from "sonner";
import { getExtension } from "@/lib/helpers";

export default function DocumentForm({
    modal,
    documentable_id,
    documentable_type,
}: {
    modal: UseModalReturn;
    documentable_id?: string | number;
    documentable_type?: string;
}) {
    const { post, processing, reset, transform, data } = useForm<{
        files: File[];
        documentable_id: string | number;
        documentable_type: string;
    }>({
        files: [],
        documentable_id: documentable_id ?? "",
        documentable_type: documentable_type ?? "",
    });

    const [files, setFiles] = useState<(File | null)[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            files: files.filter((file) => file !== null),
        }));

        post(create.url(), {
            onSuccess: () => {
                modal.closeModal();
                reset();
                setFiles([]);
            },
            onError: (e) => {
                toast.error(
                    "Gagal menambahkan dokumen. Silakan periksa kembali data yang dimasukkan.",
                );
            },
        });
    };

    return (
        <AlertDialog
            open={modal.isOpen("create")}
            onOpenChange={() => {
                modal.closeModal();
                setFiles([]);
            }}
        >
            <AlertDialogContent className="!max-w-sm max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tambah Dokumen</AlertDialogTitle>
                    </AlertDialogHeader>

                    <FieldSet className="pt-6 pb-2">
                        <FieldLabel
                            htmlFor="file"
                            className="cursor-pointer border-dashed !border-2 rounded-3xl p-4 hover:bg-muted/50 transition-colors"
                        >
                            <Field>
                                <FieldContent className="flex flex-col items-center justify-center gap-2">
                                    <div className="border rounded-full p-3 text-gray-600">
                                        <Upload />
                                    </div>
                                    <FieldTitle>Upload File</FieldTitle>
                                    <FieldDescription className="text-xs text-center">
                                        PDF, JPG, PNG, DOCX, XLSX, PPTX, TXT,
                                        SQL, ZIP, JSON, MD (Max 10MB)
                                    </FieldDescription>
                                </FieldContent>
                            </Field>
                        </FieldLabel>

                        <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                                setFiles((prev: (File | null)[]) => {
                                    return [
                                        ...prev,
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    ];
                                })
                            }
                        />
                        <Item variant="muted" className="rounded-2xl p-2">
                            <ItemContent className="flex flex-col gap-2">
                                {files.length > 0 ? (
                                    files.map((file, index) => {
                                        return (
                                            <Attachment
                                                className="w-full"
                                                key={index}
                                            >
                                                <AttachmentMedia>
                                                    <FileTextIcon />
                                                </AttachmentMedia>
                                                <AttachmentContent>
                                                    <AttachmentTitle className="truncate !max-w-52">
                                                        {file?.name ||
                                                            "Unnamed File"}
                                                    </AttachmentTitle>
                                                    <AttachmentDescription className="text-xs uppercase">
                                                        {file?.type ? getExtension(file?.name) :
                                                            "Unknown Type"}{" "}
                                                        ·{" "}
                                                        {file?.size
                                                            ? (
                                                                file?.size /
                                                                (1024 * 1024)
                                                            ).toFixed(1)
                                                            : 0}
                                                        MB
                                                    </AttachmentDescription>
                                                </AttachmentContent>
                                                <AttachmentActions>
                                                    <AttachmentAction
                                                        aria-label={`Remove ${file?.name || "Unnamed File"}`}
                                                        onClick={() => {
                                                            setFiles((prev) =>
                                                                prev.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index,
                                                                ),
                                                            );
                                                        }}
                                                        type="button"
                                                    >
                                                        <XIcon />
                                                    </AttachmentAction>
                                                </AttachmentActions>
                                            </Attachment>
                                        );
                                    })
                                ) : (
                                    <FieldDescription className="text-xs text-center">
                                        Belum ada file yang diupload
                                    </FieldDescription>
                                )}
                            </ItemContent>
                        </Item>
                    </FieldSet>

                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button
                            variant="default"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? <Spinner /> : <Save />}
                            Simpan
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
