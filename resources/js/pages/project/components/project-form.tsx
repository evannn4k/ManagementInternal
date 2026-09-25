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
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import {
    ChartNoAxesCombined,
    CodeXml,
    GitBranch,
    Plus,
    Save,
    SearchIcon,
    Trash,
    UserRoundPlus,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { UseModalReturn } from "@/types/modal";
import FormField from "@/components/form-field";
import FormSection from "@/components/form-section";
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Role } from "@/types/data/role";
import { FormFieldProps } from "@/types/form";
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
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SelectTeam } from "./select-team";
import { Badge } from "@/components/ui/badge";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";

export default function ProjectForm({
    modal,
    users,
}: {
    modal: UseModalReturn;
    users: UserWithRole[];
}) {
    const isEdit = modal.isOpen("edit");
    const isOpenModal = modal.isOpen("create") || isEdit;
    const [team, setTeam] = useState<UserWithRole[] | undefined>();
    const [status, setStatus] = useState<string[] | undefined>([]);
    const [inputStatus, setInputStatus] = useState<string>();

    const defaultStatus = ["draft", "in_progress", "review", "done"];

    const { post, put, errors, data, setData, processing, reset } = useForm({
        name: "",
        pic_id: "",
        start_date: "",
        end_date: "",
        description: "",
        priority: "",
        repo_url: "",
        branch: "",
    });

    useEffect(() => {
        if (isOpenModal) {
            setData((prevData) => ({
                ...prevData,
                name: modal.data?.name ?? "",
                pic_id: modal.data?.name ?? "",
                start_date: modal.data?.name ?? "",
                end_date: modal.data?.name ?? "",
                description: modal.data?.name ?? "",
                priority: modal.data?.name ?? "",
                repo_url: modal.data?.name ?? "",
                branch: modal.data?.name ?? "",
            }));
        } else {
            reset();
        }
    }, [isOpenModal]);

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

    const handleAddStatus = () => {
        if (!inputStatus) return;

        setStatus((prev: string[] | undefined) => {
            if (!prev) {
                prev = [];
            }

            if (prev.some((p) => p === inputStatus)) return prev;

            return [...prev, inputStatus];
        });
        setInputStatus("");
    };

    const handleDeleteStatus = (status: string) => {
        setStatus((prev: string[] | undefined) => {
            if (!prev) return;

            return prev.filter((s) => s !== status);
        });
    };

    const handleDeleteTeam = (user: UserWithRole) => {
        setTeam((prev: UserWithRole[] | undefined) => {
            if (!prev) return;

            return prev.filter((u) => u.id !== user.id);
        });
    };

    const mainFields = [
        {
            label: "Name",
            name: "name",
            onChange: handleChange,
            error: errors.name,
            value: data.name,
            required: true,
            placeholder: "E-commerce",
        },
        {
            label: "Lead Rekayasa (PIC)",
            name: "pic_id",
            onChange: handleChange,
            error: errors.pic_id,
            value: data.pic_id,
            type: "select",
            options: users.map((user) => {
                return {
                    value: user.id,
                    label: user.name,
                };
            }),
            required: true,
            placeholder: "Pilih PIC",
        },
        {
            label: "Tanggal Mulai",
            name: "start_date",
            onChange: handleChange,
            error: errors.start_date,
            value: data.start_date,
            type: "date",
            required: true,
        },
        {
            label: "Tanggal Selesai (Target)",
            name: "end_date",
            onChange: handleChange,
            error: errors.end_date,
            value: data.end_date,
            min: data.start_date,
            type: "date",
            required: true,
        },
        {
            label: "Deskripsi",
            name: "description",
            onChange: handleChange,
            error: errors.description,
            value: data.description,
            type: "textarea",
            col: 2,
            placeholder:
                "Tuliskan objektif teknis, dependensi utama, target throughput (RPS), dan kriteria penerimaan...",
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
            cols: 3,
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
            ],
            col: 2,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setData((prev) => {
            return {
                ...prev,
                status: status,
                teams: team?.map((t) => t.id),
            };
        });

        if (isEdit) {
            put("/project/" + modal.data?.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/project", {
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
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {isEdit ? "Edit Proyek" : "Buat Proyek Baru"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Inisialisasi inisiatif repositori, tetapkan PIC &
                            anggota tim, alokasi target kuartal, serta workflow
                            tim.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6 pb-2 items-start">
                        <FieldSet className="col-span-1 md:col-span-3">
                            <FormSection col={2}>
                                {mainFields.map((field) => (
                                    <FormField key={field.name} {...field} />
                                ))}
                                <Card className="col-span-1 md:col-span-2 bg-muted/50 p-2">
                                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                                        <FormField
                                            col={2}
                                            icon={CodeXml}
                                            label="Git Repository URL"
                                            name="repo_url"
                                            error={errors.repo_url}
                                            value={data.repo_url}
                                            placeholder="acme-corp/identity-gateway"
                                            onChange={handleChange}
                                        />
                                        <FormField
                                            col={1}
                                            icon={GitBranch}
                                            label="Branch"
                                            name="branch"
                                            error={errors.branch}
                                            value={data.branch}
                                            placeholder="main"
                                            onChange={handleChange}
                                        />
                                    </CardContent>
                                </Card>
                            </FormSection>
                        </FieldSet>
                        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                            <Card>
                                <CardHeader>
                                    <CardAction>
                                        <Button
                                            type="button"
                                            size="xs"
                                            variant="default"
                                            onClick={() =>
                                                setStatus(defaultStatus)
                                            }
                                        >
                                            Default
                                        </Button>
                                    </CardAction>
                                    <CardTitle className="flex items-center gap-2">
                                        <ChartNoAxesCombined className="text-default" />{" "}
                                        Urutan Status{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Tetapkan urutan status untuk tugas
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <InputGroup>
                                        <InputGroupInput
                                            value={inputStatus}
                                            onChange={(e) => {
                                                setInputStatus(e.target.value);
                                            }}
                                            placeholder="Tambah status"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleAddStatus();
                                                }
                                            }}
                                        />
                                        <InputGroupAddon
                                            className="cursor-pointer"
                                            onClick={handleAddStatus}
                                        >
                                            <Plus />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {status && status?.length > 0 ? (
                                        <div className="pt-2">
                                            <CardDescription className="ps-2 py-2">
                                                Daftar status :{" "}
                                            </CardDescription>
                                            <Table>
                                                <TableBody>
                                                    {status.map((s) => (
                                                        <TableRow key={s}>
                                                            <TableCell>
                                                                {s}
                                                            </TableCell>
                                                            <TableCell className="text-end cursor-pointer">
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="icon-xs"
                                                                    className="cursor-pointer"
                                                                    onClick={() =>
                                                                        handleDeleteStatus(
                                                                            s,
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ) : (
                                        <CardDescription className="text-center pt-4">
                                            Belum ada status
                                        </CardDescription>
                                    )}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardAction>
                                        <Badge
                                            className="size-sm rounded-full"
                                            variant="outline"
                                        >
                                            {team?.length ?? 0} terpilih
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
                                        team={team}
                                        setTeam={setTeam}
                                        users={users}
                                        className="w-full"
                                    />
                                    {team && team?.length > 0 ? (
                                        <div className="pt-2">
                                            <CardDescription className="ps-2 py-2">
                                                Daftar anggota :{" "}
                                            </CardDescription>
                                            <Table>
                                                <TableBody>
                                                    {team &&
                                                        team.map(
                                                            (
                                                                t: UserWithRole,
                                                            ) => (
                                                                <TableRow
                                                                    key={t.id}
                                                                >
                                                                    <TableCell>
                                                                        {t.name}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        className="text-end cursor-pointer"
                                                                        onClick={() =>
                                                                            handleDeleteTeam(
                                                                                t,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Button
                                                                            type="button"
                                                                            variant="destructive"
                                                                            size="icon-xs"
                                                                        >
                                                                            <Trash />
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ),
                                                        )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ) : (
                                        <CardDescription className="text-center pt-4">
                                            Belum ada anggota
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
