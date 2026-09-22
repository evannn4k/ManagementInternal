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
import { Role } from "@/types/data/role";
import { FormFieldProps } from "@/types/form";
import { Button } from "@/components/ui/button";

export default function UserForm({
    roles,
    modal,
}: {
    roles: Role[];
    modal: UseModalReturn;
}) {
    const isEdit = modal.isOpen("edit");
    const isOpenModal = modal.isOpen("create") || isEdit;

    const { post, put, errors, data, setData, processing, reset } = useForm({
        name: "",
        email: "",
        role_id: "",
        password: "",
        password_confirmation: "",
        is_active: "",
    });

    useEffect(() => {
        if (isOpenModal) {
            setData((prevData) => ({
                ...prevData,
                name: modal.data?.name ?? "",
                email: modal.data?.email ?? "",
                role_id: modal.data?.role_id ?? "",
                is_active: modal.data?.is_active ?? "",
            }));
        } else {
            reset();
        }
    }, [isOpenModal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put("/user/" + modal.data?.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/user", {
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

    const roleOption = roles.map((role) => {
        return {
            label: role.name,
            value: role.id,
        };
    });

    const mainFields: FormFieldProps[] = [
        {
            label: "Nama",
            name: "name",
            onChange: handleChange,
            error: errors.name,
            value: data.name,
            required: true,
            placeholder: "Masukan nama anda",
        },
        {
            label: "Email",
            name: "email",
            onChange: handleChange,
            error: errors.email,
            value: data.email,
            type: "email",
            required: true,
            placeholder: "Masukan email yang valid",
        },
        {
            label: "Role",
            name: "role_id",
            onChange: handleChange,
            error: errors.role_id,
            value: data.role_id,
            type: "select",
            options: roleOption,
            required: true,
            placeholder: "Pilih role",
        },
        {
            label: "Status",
            name: "is_active",
            onChange: handleChange,
            error: errors.is_active,
            value: data.is_active,
            type: "radio-group",
            setData: setData,
            orientation: "horizontal",
            options: [
                {
                    label: "Aktif",
                    value: 1,
                },
                {
                    label: "Tidak Aktif",
                    value: 0,
                },
            ],
            required: true,
        },
    ];

    const passwordFields: FormFieldProps[] = [
        {
            label: "Password",
            name: "password",
            onChange: handleChange,
            error: errors.password,
            value: data.password,
            type: "password",
            required: true,
            placeholder: "●●●●●●●●",
            hidden: isEdit,
        },
        {
            label: "Konfirmasi Password",
            name: "password_confirmation",
            onChange: handleChange,
            error: errors.password_confirmation,
            value: data.password_confirmation,
            type: "password",
            required: true,
            placeholder: "●●●●●●●●",
            hidden: isEdit,
        },
    ];

    console.log(data)

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent className="!max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {isEdit ? "Edit User" : "Tambah User"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            mengedit user.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <FieldSet className="pt-6 pb-2">
                        <FormSection col={2}>
                            {mainFields.map((field) => (
                                <FormField key={field.name} {...field} />
                            ))}
                            {!isEdit && (
                                <>
                                    <FieldSeparator className="col-span-2" />
                                    {passwordFields.map((field) => (
                                        <FormField
                                            key={field.name}
                                            {...field}
                                        />
                                    ))}
                                </>
                            )}
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
