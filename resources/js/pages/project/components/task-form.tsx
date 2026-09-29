import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FieldDescription, FieldSet } from "@/components/ui/field";
import {
    ChartNoAxesCombined,
    CodeXml,
    GitBranch,
    Plus,
    Save,
    Tag,
    Trash,
    UserRoundPlus,
    X,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { UseModalReturn } from "@/types/modal";
import FormField from "@/components/form-field";
import FormSection from "@/components/form-section";
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UserWithRole } from "@/types/data/user";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SelectTeam } from "./select-team";
import { Badge } from "@/components/ui/badge";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { IconBox } from "@/components/icon";
import { ProjectType } from "@/types/data/project";

export default function TaskForm({
    modal,
    project,
}: {
    modal: UseModalReturn;
    project: ProjectType;
}) {
    const isEdit = modal.isOpen("edit");
    const isOpenModal = modal.isOpen("create") || isEdit;
    const [assigned, setAssigned] = useState<UserWithRole[] | undefined>();
    const [label, setLabel] = useState<string[] | undefined>();
    const [inputLabel, setInputLabel] = useState<string | undefined>();

    const { post, put, errors, data, setData, processing, reset, clearErrors } =
        useForm({
            title: "",
            description: "",
            status_id: "",
            priority: "",
            due_date: "",
            file: "",
        });

    useEffect(() => {
        if (isOpenModal) {
            setData((prevData) => ({
                ...prevData,
                title: isEdit ? modal.data.title : "",
                description: isEdit ? modal.data.description : "",
                status_id: isEdit ? modal.data.status_id : "",
                priority: isEdit ? modal.data.priority : "",
                due_date: isEdit ? modal.data.due_date : "",
                file: isEdit ? modal.data.file : "",
            }));
        } else {
            reset();
            setLabel([])
            setAssigned([])
            clearErrors();
        }
    }, [isOpenModal, modal.data]);

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

    const mainFields = [
        {
            label: "Judul",
            name: "title",
            onChange: handleChange,
            error: errors.title,
            value: data.title,
            required: true,
            placeholder: "Authentication",
            col: 2,
        },
        {
            label: "Deskripsi",
            name: "description",
            error: errors.description,
            value: data.description,
            type: "rich-editor",
            required: true,
            setData: setData,
            col: 2,
        },
        {
            label: "Tanggal Pengumpulan",
            name: "due_date",
            onChange: handleChange,
            error: errors.due_date,
            value: data.due_date,
            type: "date",
            required: true,
        },
        {
            label: "Status",
            name: "status_id",
            onChange: handleChange,
            error: errors.status_id,
            value: data.status_id,
            type: "select",
            options: project.statuses.map((status) => ({
                label: status.name,
                value: status.id,
            })),
            required: true,
            placeholder: "Pilih status tugas",
        },
        {
            label: "File",
            name: "file",
            onChange: handleChange,
            error: errors.file,
            type: "file",
            required: true,
            description: "Maksimal 10MB",
        },
        {
            label: "Prioritas",
            name: "priority",
            onChange: handleChange,
            error: errors.priority,
            value: data.priority,
            type: "radio-group",
            orientation: "horizontal",
            setData: setData,
            cols: 4,
            required: true,
            options: [
                {
                    label: "Low",
                    value: "low",
                    className: "text-green-700",
                },
                {
                    label: "Medium",
                    value: "medium",
                    className: "text-yellow-700",
                },
                {
                    label: "High",
                    value: "high",
                    className: "text-red-700",
                },
                {
                    label: "Urgent",
                    value: "urgent",
                    className: "text-black",
                },
            ],
            col: 2,
        },
    ];

    const handleDeleteTeam = (user: UserWithRole) => {
        setAssigned((prev: UserWithRole[] | undefined) => {
            if (!prev) return;

            return prev.filter((u) => u.id !== user.id);
        });
    };

    const handleAddLabel = () => {
        if (!inputLabel) return;

        setLabel((prev: string[] | undefined) => {
            if (!prev) {
                prev = [];
            }

            if (prev.some((p) => p === inputLabel)) return prev;

            return [...prev, inputLabel];
        });
        setInputLabel("");
    };

    const handleDeleteLabel = (label: string) => {
        setLabel((prev: string[] | undefined) => {
            if (!prev) return;

            return prev.filter((l) => l !== label);
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setData((prev) => {
            return {
                ...prev,
                label: label,
                assigned: assigned?.map((user) => user.id),
            };
        });

        if (isEdit) {
            put("/task/" + modal.data?.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/task", {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        }
    };

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4">
                        <IconBox>
                            <Plus />
                        </IconBox>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {isEdit ? "Edit Proyek" : "Buat Proyek Baru"}
                            </AlertDialogTitle>
                            <FieldDescription>
                                Inisialisasi inisiatif repositori, tetapkan PIC
                                & anggota tim, alokasi target kuartal, serta
                                workflow tim.
                            </FieldDescription>
                        </AlertDialogHeader>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6 pb-2 items-start">
                        <FieldSet className="col-span-1 md:col-span-3">
                            <FormSection col={2}>
                                {mainFields.map((field) => (
                                    <FormField key={field.name} {...field} />
                                ))}
                            </FormSection>
                        </FieldSet>
                        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                            <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Tag className="text-default" />{" "}
                                        Label
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Daftar tag tugas ini
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <InputGroup className="bg-background">
                                        <InputGroupInput
                                            value={inputLabel}
                                            onChange={(e) => {
                                                setInputLabel(e.target.value);
                                            }}
                                            placeholder="Tambah status"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleAddLabel();
                                                }
                                            }}
                                        />
                                        <InputGroupAddon
                                            className="cursor-pointer"
                                            onClick={handleAddLabel}
                                        >
                                            <Plus />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {label && label.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-4">
                                            {label?.map((l) => (
                                                <Badge className="rounded-full">
                                                    {l}{" "}
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            handleDeleteLabel(l)
                                                        }
                                                    >
                                                        <X className="size-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardAction>
                                        <Badge
                                            className="size-sm rounded-full"
                                            variant="outline"
                                        >
                                            {assigned?.length ?? 0} terpilih
                                        </Badge>
                                    </CardAction>
                                    <CardTitle className="flex items-center gap-2">
                                        <UserRoundPlus /> Anggota Team
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Tetapkan sekarang (opsional)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SelectTeam
                                        setTeam={setAssigned}
                                        users={
                                            project.teams
                                                ? project?.teams.map(
                                                      (team: UserWithRole) => ({
                                                          id: team.id,
                                                          name: team.name,
                                                          position:
                                                              team.position,
                                                      }),
                                                  )
                                                : []
                                        }
                                        className="w-full bg-background"
                                    />
                                    {assigned && assigned?.length > 0 ? (
                                        <div className="pt-2">
                                            <CardDescription className="ps-2 py-2">
                                                Anggota terpilih :{" "}
                                            </CardDescription>
                                            <div className="flex w-full max-w-md flex-col gap-2">
                                                {assigned.map(
                                                    (user: UserWithRole) => (
                                                        <Item
                                                            key={user.id}
                                                            variant="outline"
                                                            size="xs"
                                                            className="bg-background"
                                                        >
                                                            <ItemContent>
                                                                <ItemTitle>
                                                                    {user.name}
                                                                </ItemTitle>
                                                                <ItemDescription>
                                                                    {
                                                                        user.position
                                                                    }
                                                                </ItemDescription>
                                                            </ItemContent>
                                                            <ItemActions>
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="icon-xs"
                                                                    className="cursor-pointer"
                                                                    onClick={() =>
                                                                        handleDeleteTeam(
                                                                            user,
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash />
                                                                </Button>
                                                            </ItemActions>
                                                        </Item>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <CardDescription className="text-center pt-4">
                                            Belum ada anggota terpilih
                                        </CardDescription>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
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
