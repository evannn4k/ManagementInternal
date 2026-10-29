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
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProjectFormStatus({
    modal,
    setStatus,
}: {
    modal: UseModalReturn;
    setStatus: React.Dispatch<
        React.SetStateAction<{ name: string; type: string }[] | undefined>
    >;
}) {
    const isOpenModal = modal.isOpen("create");
    const initialStatus = {
        name: "",
        type: "",
    };

    const [inputStatus, setInputStatus] = useState<{
        name: string;
        type: string;
    }>(initialStatus);

    const [errors, setErrors] = useState<{ name: string; type: string }>(
        initialStatus,
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputStatus.name) {
            setErrors((prev) => ({ ...prev, name: "Nama wajib diisi" }));
        }

        if (!inputStatus.type) {
            setErrors((prev) => ({ ...prev, type: "Tipe wajib diisi" }));
        }

        if (inputStatus.type || inputStatus.name) {
            setStatus((prev) => {
                const currentPrev = prev ?? [];

                const existsStatus = currentPrev.find(
                    (p) => p.name == inputStatus.name,
                );
                if (existsStatus) {
                    return currentPrev;
                }

                return [...currentPrev, inputStatus];
            });

            modal.closeModal();
            setErrors(initialStatus);
            setInputStatus(initialStatus);
        }
    };

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent
                size="sm"
                className="max-h-[90vh] overflow-y-auto no-scrollbar"
            >
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Tambah Status Proyek
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Silakan edit nama status proyek di bawah ini.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <FieldSet className="col-span-1 md:col-span-3">
                        <FormSection>
                            <FormField
                                error={errors.name}
                                label="Nama Status"
                                name="name"
                                placeholder="Masukkan nama status"
                                value={inputStatus.name}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setInputStatus({
                                        name: val ?? "",
                                        type: inputStatus.type ?? "",
                                    });
                                }}
                            />
                            <FormField
                                error={errors.type}
                                label="Tipe"
                                name="type"
                                placeholder="Pilih tipe status"
                                value={inputStatus.type}
                                type="select"
                                options={[
                                    { label: "Pending", value: "pending" },
                                    { label: "Running", value: "running" },
                                    { label: "Completed", value: "completed" },
                                    { label: "Canceled", value: "canceled" },
                                ]}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setInputStatus({
                                        name: inputStatus.name ?? "",
                                        type: val ?? "",
                                    });
                                }}
                            />
                        </FormSection>
                    </FieldSet>

                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button variant="default" type="submit">
                            <Save />
                            Simpan
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
