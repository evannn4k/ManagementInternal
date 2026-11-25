import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FieldDescription, FieldSet } from "@/components/ui/field";
import { PenSquare, Plus, Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { UseModalReturn } from "@/types/modal";
import FormField from "@/components/form-field";
import FormSection from "@/components/form-section";
import React, { useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { IconBox } from "@/components/icon";
import { ProjectType } from "@/types/data/project";
import { DatePickerRange } from "@/components/date-picker-range";
import { DateRange } from "react-day-picker";
import { create, update } from "@/routes/project/sprint";
import dayjs from "dayjs";

interface SprintFormData {
    project_id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
}

export default function SprintForm({
    modal,
    project,
    conflictDate,
}: {
    modal: UseModalReturn;
    project: ProjectType;
    conflictDate: {
        from: Date | undefined;
        to: Date | undefined;
    }[];
}) {
    const isEdit = modal.isOpen("edit");
    const isOpenModal = modal.isOpen("create") || isEdit;
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });

    const {
        post,
        put,
        errors,
        data,
        setData,
        processing,
        reset,
        clearErrors,
        transform,
    } = useForm<SprintFormData>({
        project_id: project.id,
        name: "",
        description: "",
        start_date: "",
        end_date: "",
    });

    useEffect(() => {
        if (isOpenModal) {
            if (isEdit && modal.data) {
                setData((prevData) => ({
                    ...prevData,
                    project_id: modal.data.project_id ?? project.id,
                    name: modal.data.name ?? "",
                    description: modal.data.description ?? "",
                    start_date: modal.data.start_date ?? "",
                    end_date: modal.data.end_date ?? "",
                }));

                setDate({
                    from: modal.data.start_date ?? "",
                    to: modal.data.end_date ?? "",
                });
            } else {
                setData((prevData) => ({
                    ...prevData,
                    project_id: project.id,
                    name: "",
                    description: "",
                    start_date: "",
                    end_date: "",
                }));
            }
        } else {
            reset();
            clearErrors();
        }
    }, [isOpenModal, isEdit, modal.data, project.id]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { id, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const mainFields = [
        {
            label: "Nama Sprint",
            name: "name",
            onChange: handleChange,
            error: errors.name,
            value: data.name,
            required: true,
            placeholder: "Sprint 1 - Authentication",
            col: 2,
        },
        {
            label: "Tanggal Mulai",
            name: "range_date",
            type: "custom",
            col: 2,
            input: (
                <>
                    <DatePickerRange
                        project={project}
                        date={date}
                        setDate={setDate}
                        conflictDate={conflictDate}
                    />
                </>
            ),
            required: true,
        },
        {
            label: "Deskripsi",
            name: "description",
            error: errors.description,
            value: data.description,
            type: "textarea",
            setData: setData,
            onChange: handleChange,
            col: 2,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((prev) => ({
            ...prev,
            start_date: dayjs(date?.from).format("YYYY-MM-DD"),
            end_date: dayjs(date?.to).format("YYYY-MM-DD"),
        }));

        if (isEdit) {
            put(update.url({ project: project.id, sprint: modal.data?.id }), {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                    setDate({ from: undefined, to: undefined });
                    router.reload();
                },
            });
        } else {
            post(create.url(project.id), {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                    setDate({ from: undefined, to: undefined });
                    router.reload();
                },
            });
        }
    };

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent className="!max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4">
                        <IconBox>{isEdit ? <PenSquare /> : <Plus />}</IconBox>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {isEdit ? "Edit Sprint" : "Buat Sprint Baru"}
                            </AlertDialogTitle>
                            <FieldDescription>
                                Digunakan untuk membuat atau memperbarui sprint
                                pada project{" "}
                                <span className="font-medium text-foreground">
                                    {project.name}
                                </span>
                                .
                            </FieldDescription>
                        </AlertDialogHeader>
                    </div>

                    <div className="pt-6 pb-2">
                        <FieldSet>
                            <FormSection col={2}>
                                {mainFields.map((field) => (
                                    <FormField
                                        key={field.name + field.label}
                                        {...field}
                                    />
                                ))}
                            </FormSection>
                        </FieldSet>
                    </div>

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
