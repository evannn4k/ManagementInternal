import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FieldSet } from "@/components/ui/field";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { UseModalReturn } from "@/types/modal";
import FormField from "@/components/form-field";
import FormSection from "@/components/form-section";
import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import updateStatusProject from "@/actions/App/Http/Controllers/Project/UpdateStatusProjectController";

export default function ProjectStatusForm({
    modal,
}: {
    modal: UseModalReturn;
}) {
    const isOpenModal = modal.isOpen("edit");

    const { put, errors, data, setData, processing, reset, clearErrors } =
        useForm({
            name: "",
        });

    useEffect(() => {
        if (isOpenModal) {
            setData(() => ({
                name: modal.data.name ?? "",
            }));
        } else {
            reset();
            clearErrors();
        }
    }, [isOpenModal, modal.data]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { value } = e.target;

        setData({
            name: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(updateStatusProject(modal.data?.id).url, {
            onSuccess: () => {
                modal.closeModal();
                reset();
            },
        });
    };

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent
                size="sm"
                className="max-h-[90vh] overflow-y-auto no-scrollbar"
            >
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit Status Proyek</AlertDialogTitle>
                        <AlertDialogDescription>
                            Silakan edit nama status proyek di bawah ini.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <FieldSet className="col-span-1 md:col-span-3">
                        <FormSection>
                            <FormField
                                label="Nama Status"
                                name="name"
                                error={errors.name}
                                value={data.name}
                                placeholder="Masukkan nama status"
                                onChange={handleChange}
                            />
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
