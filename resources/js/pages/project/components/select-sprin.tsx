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

export function SelectSprint({
    modal,
    sprintsList,
}: {
    modal: UseModalReturn;
    sprintsList: SprintListType[];
}) {
    const isOpenModal = modal.isOpen("edit");

    const { patch, errors, data, setData, processing, reset } = useForm({
        sprint_id: "",
    });

    useEffect(() => {
        if (isOpenModal) {
            setData((prevData) => ({
                ...prevData,
                sprint_id: modal.data?.sprint_id ?? "",
            }));
        } else {
            reset();
        }
    }, [isOpenModal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch("/role/" + modal.data?.id, {
            onSuccess: () => {
                modal.closeModal();
                reset();
            },
        });
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { id, value } = e.target;

        setData({
            ...data,
            [id]: value,
        });
    };

    const sprintOptions = [ 
        { label: "Tidak pada sprint apapun", value: "" },
        ...sprintsList.map((sprint) => {
            return {
                label: "Sprint " + sprint.number + " - " + sprint.name,
                value: sprint.id,
            };
        }),
    ];

    const mainFields: FormFieldProps[] = [
        {
            label: "Sprint",
            name: "sprint_id",
            setData: setData,
            error: errors.sprint_id,
            value: data.sprint_id,
            type: "radio-group",
            options: sprintOptions,
            required: false,
            placeholder: "Masukan ke sprint",
        },
    ];

    console.log(data)

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent className="!max-w-sm max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Masukan ke sprint </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk memasukan atau
                            memindahkan sprint.
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
