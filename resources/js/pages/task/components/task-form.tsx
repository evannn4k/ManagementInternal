import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FieldDescription, FieldError, FieldSet } from "@/components/ui/field";
import {
    ChartNoAxesCombined,
    CodeXml,
    GitBranch,
    PenSquare,
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
import { router, useForm } from "@inertiajs/react";
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
import { SelectTeam } from "../../project/components/select-team";
import { Badge } from "@/components/ui/badge";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemTitle,
} from "@/components/ui/item";
import { IconBox } from "@/components/icon";
import { ProjectType } from "@/types/data/project";
import { cn } from "@/lib/utils";

interface TaskFormData {
    title: string;
    description: string;
    status_id: string;
    priority: string;
    due_date: string;
    file: string;
    label: string[];
    assigned: number[];
}

export default function TaskForm({
    modal,
    project,
    projects,
}: {
    modal: UseModalReturn;
    project?: ProjectType;
    projects?: any[];
}) {
    const isEdit = modal.isOpen("edit");
    const isOpenModal = modal.isOpen("create") || isEdit;
    const [assigned, setAssigned] = useState<UserWithRole[] | undefined>();
    const [label, setLabel] = useState<string[] | undefined>();
    const [inputLabel, setInputLabel] = useState<string | undefined>();
    const [selectedProject, setSelectedProject] = useState<
        { label: string; value: string } | undefined
    >();

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
    } = useForm<TaskFormData>({
        title: "",
        description: "",
        status_id: "",
        priority: "",
        due_date: "",
        file: "",
        label: [],
        assigned: [],
    });

    useEffect(() => {
        if (errors.assigned) {
            setAssigned([]);
        } else if (errors.label) {
            setLabel([]);
        }
    }, [errors.assigned, errors.label]);

    useEffect(() => {
        if (isOpenModal) {
            setAssigned(isEdit ? modal.data.assigned : []);
            setLabel(isEdit ? modal.data.label : []);
            setData((prevData) => ({
                ...prevData,
                title: isEdit ? modal.data.title : "",
                description: isEdit ? modal.data.description : "",
                status_id: isEdit ? modal.data.status_id : "",
                priority: isEdit ? modal.data.priority : "",
                due_date: isEdit ? modal.data.due_date : "",
            }));
        } else {
            reset();
            setLabel([]);
            setAssigned([]);
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
            label: "Tenggat Waktu",
            name: "due_date",
            onChange: handleChange,
            error: errors.due_date,
            value: data.due_date,
            type: "date",
        },
        {
            label: "Status",
            name: "status_id",
            onChange: handleChange,
            error: errors.status_id,
            value: data.status_id,
            type: "select",
            options: project
                ? project.statuses.map((status) => ({
                      label: status.name,
                      value: status.id,
                  }))
                : [],
            required: true,
            placeholder: "Pilih status tugas",
            hidden: Boolean(!project && projects) || isEdit,
        },
        {
            label: "Project",
            name: "status_id",
            error: errors.status_id,
            value: selectedProject,
            type: "search",
            options: projects
                ? projects.map((project) => ({
                      label: project.name,
                      value: project.default_status.id,
                  }))
                : [],
            setData: setSelectedProject,
            required: true,
            placeholder: "Pilih project tugas",
            hidden: Boolean(project && !projects) || isEdit,
            description: "Default status tugas",
        },
        {
            label: isEdit ? "File" : "Ganti File",
            name: "file",
            onChange: handleChange,
            error: errors.file,
            type: "file",
            col: isEdit ? 1 : 2,
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
                    className: "text-blue-700 dark:text-blue-500",
                },
                {
                    label: "Medium",
                    value: "medium",
                    className: "text-yellow-700 dark:text-yellow-500",
                },
                {
                    label: "High",
                    value: "high",
                    className: "text-red-700 dark:text-red-500",
                },
                {
                    label: "Urgent",
                    value: "urgent",
                    className: "text-foreground",
                },
            ],
            col: 2,
        },
        {
            label: "Deskripsi",
            name: "description",
            error: errors.description,
            value: data.description,
            type: "rich-editor",
            setData: setData,
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

        transform((prev) => {
            return {
                ...prev,
                status_id: selectedProject
                    ? selectedProject?.value
                    : prev.status_id,
                label: label ?? [],
                assigned: assigned?.map((user) => user.id) ?? [],
            };
        });

        if (isEdit) {
            put("/task/" + modal.data?.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                    router.reload();
                },
            });
        } else {
            post("/task", {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                    router.reload();
                },
            });
        }
    };

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4">
                        <IconBox>{isEdit ? <PenSquare /> : <Plus />}</IconBox>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {isEdit ? "Edit Tugas" : "Buat Tugas Baru"}
                            </AlertDialogTitle>
                            <FieldDescription>
                                Digunakan untuk membuat atau memperbarui detail
                                tugas—termasuk judul, status, prioritas, tenggat
                                waktu, deskripsi, lampiran file, label, serta
                                penetapan anggota tim (PIC).
                            </FieldDescription>
                        </AlertDialogHeader>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6 pb-2 items-start">
                        <FieldSet className="col-span-1 md:col-span-3">
                            <FormSection col={2}>
                                {mainFields.map((field) => (
                                    <FormField
                                        key={field.name + field.label}
                                        {...field}
                                    />
                                ))}
                            </FormSection>
                        </FieldSet>
                        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                            <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle
                                        className={cn(
                                            "flex items-center gap-2",
                                            errors.label && "text-destructive",
                                        )}
                                    >
                                        {" "}
                                        <Tag className="text-default" /> Label
                                    </CardTitle>
                                    {Boolean(errors.label) ? (
                                        <FieldError>{errors.label}</FieldError>
                                    ) : (
                                        <CardDescription className="text-xs">
                                            Daftar tag tugas ini
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <InputGroup className="bg-background">
                                        <InputGroupInput
                                            value={inputLabel || ""}
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
                                                <Badge
                                                    className="rounded-full"
                                                    key={l}
                                                >
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
                            {project && !projects && (
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
                                        <CardTitle
                                            className={cn(
                                                "flex items-center gap-2",
                                                errors.assigned &&
                                                    "text-destructive",
                                            )}
                                        >
                                            <UserRoundPlus /> Tetapkan team
                                        </CardTitle>
                                        {Boolean(errors.assigned) ? (
                                            <FieldError>
                                                {errors.assigned}
                                            </FieldError>
                                        ) : (
                                            <CardDescription className="text-xs">
                                                Tetapkan sekarang (opsional)
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <SelectTeam
                                            error={Boolean(errors.assigned)}
                                            setTeam={setAssigned}
                                            users={
                                                project && project.teams
                                                    ? project?.teams.map(
                                                          (
                                                              team: UserWithRole,
                                                          ) => ({
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
                                                        (
                                                            user: UserWithRole,
                                                            i: number,
                                                        ) => (
                                                            <Item
                                                                variant="muted"
                                                                className="p-2"
                                                                key={user.id}
                                                            >
                                                                <ItemContent className="p-0">
                                                                    <ItemTitle>
                                                                        {i + 1}.{" "}
                                                                        {
                                                                            user.name
                                                                        }{" "}
                                                                        {user.position
                                                                            ? ` | ${user.position}`
                                                                            : ""}
                                                                    </ItemTitle>
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
                            )}
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
