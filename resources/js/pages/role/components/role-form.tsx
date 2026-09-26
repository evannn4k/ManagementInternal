import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    FieldDescription,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { UseModalReturn } from "@/types/modal";
import FormField from "@/components/form-field";
import FormSection from "@/components/form-section";
import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { FormFieldProps } from "@/types/form";
import { Button } from "@/components/ui/button";

export function RoleForm({ modal }: { modal: UseModalReturn }) {
    const isEdit = modal.isOpen("edit");
    const isOpenModal = modal.isOpen("create") || isEdit;

    const { post, put, errors, data, setData, processing, reset } = useForm({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (isOpenModal) {
            setData((prevData) => ({
                ...prevData,
                name: modal.data?.name ?? "",
                description: modal.data?.description ?? "",
            }));
        } else {
            reset();
        }
    }, [isOpenModal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put("/role/" + modal.data?.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/role", {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { id, type, value } = e.target;

        const files =
            type === "file" ? (e.target as HTMLInputElement).files : null;

        setData({
            ...data,
            [id]: files ? (files && files[0] ? files[0] : "") : value,
        });
    };

    const mainFields: FormFieldProps[] = [
        {
            label: "Nama",
            name: "name",
            onChange: handleChange,
            error: errors.name,
            value: data.name,
            required: true,
            placeholder: "Developer",
        },
        {
            label: "Deskripsi",
            name: "description",
            onChange: handleChange,
            error: errors.description,
            value: data.description,
            type: "textarea",
            placeholder: "Hanya akses projek dan tugas yang telah diberikan",
        },
    ];

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent className="!max-w-sm max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {isEdit ? "Edit Role" : "Tambah Role"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            mengedit role.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <FieldSet className="pt-6 pb-2">
                        <FormSection col={1}>
                            {mainFields.map((field) => (
                                <FormField key={field.name} {...field} />
                            ))}
                        </FormSection>
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
