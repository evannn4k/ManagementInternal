import { Button } from "@/components/ui/button";
import {
    ChevronDownIcon,
    CircleCheck,
    MoreVertical,
    Plus,
    SearchIcon,
    Shield,
    ShieldCheck,
    SquarePen,
    Trash2,
    UsersRound,
} from "lucide-react";
import { index as roleIndex } from "@/routes/role";
import { Permission, Role } from "@/types/data/role";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import syncRole from "@/actions/App/Http/Controllers/Role/SyncRolePermissionController";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { SelectScopePermission } from "./components/select-scope-permission";
import { SelectPermissionToggle } from "./components/select-permission-toggle";
import { RoleForm } from "./components/role-form";
import { useModal } from "@/hooks/use-modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteAlert } from "@/components/delete-alert";
import deleteRole from "@/actions/App/Http/Controllers/Role/DeleteRoleController";

export default function RolePage({
    roles,
    permissions,
}: {
    roles: { data: Role[] };
    permissions: Record<string, Record<string, Permission[]>>;
}) {
    const [selected, setSelected] = useState<number[] | undefined>();
    const [roleId, setRoleId] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const modal = useModal();

    console.log(roleId);
    console.log(selected);

    const handleSyncPermission = async (): Promise<void> => {
        if (!roleId) return;

        router.put(
            syncRole(roleId),
            {
                permissions_id: selected,
            },
            {
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
                onError: (e) => {
                    console.log(e);
                    toast.error("Gagal merubah perizinan");
                },
            },
        );
    };

    const handleChangePermission = (checked: boolean, value: number): void => {
        if (!selected) return;

        if (checked) {
            setSelected([...selected, value]);
        } else {
            setSelected(selected.filter((s) => s !== value));
        }
    };

    const handleChangeScopePermission = (
        scopeIds: number[],
        value?: number,
    ): void => {
        if (!selected) return;

        const withoutGroup = selected.filter((id) => !scopeIds.includes(id));

        if (value !== undefined && value > 0) {
            setSelected([...withoutGroup, value]);
        } else {
            setSelected(withoutGroup);
        }
    };

    const handleDelete = (id: number) => {
        router.delete(deleteRole({ role: id }));
    };

    return (
        <>
            <Head title="User" />
            <RoleForm modal={modal} />
            <DeleteAlert
                modal={modal}
                title="Hapus role"
                description="Data role yang telah dihapus dapat dikembalikan."
                handleDelete={handleDelete}
            />
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center text-sm text-primary font-semibold">
                            <ShieldCheck size="24" /> SISTEM AKSES TERPUSAT
                        </div>
                        <h1 className="font-semibold text-2xl md:text-3xl">
                            Role & Permission Setting
                        </h1>
                        <p>
                            Kelola level otorisasi akses pengguna, matriks hak
                            akses per resource, serta override pengecualian
                            individu secara deterministik.
                        </p>
                    </div>
                    <Button
                        onClick={handleSyncPermission}
                        disabled={isLoading || !selected}
                    >
                        {isLoading ? <Spinner /> : <CircleCheck />}
                        Simpan Perubahan
                    </Button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="col-span-1">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-start md:items-center gap-2">
                                    <Shield /> Daftar Peran
                                </CardTitle>
                                <CardAction>
                                    <Button
                                        size="sm"
                                        onClick={() => modal.openCreate()}
                                    >
                                        <Plus /> Tambah
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <InputGroup>
                                        <InputGroupInput placeholder="Search..." />
                                        <InputGroupAddon>
                                            <SearchIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <RadioGroup
                                        onValueChange={(selectedRoleRadio) => {
                                            const selectedRole:
                                                | Role
                                                | undefined = roles.data.find(
                                                (r) => {
                                                    return (
                                                        r.id ==
                                                        Number(
                                                            selectedRoleRadio,
                                                        )
                                                    );
                                                },
                                            );

                                            if (selectedRole) {
                                                setSelected(
                                                    selectedRole?.permissions,
                                                );
                                                setRoleId(selectedRole.id);
                                            }
                                        }}
                                    >
                                        {roles.data.map((role: Role) => (
                                            <FieldLabel
                                                className="bg-background/50"
                                                htmlFor={role.name}
                                                key={role.id}
                                            >
                                                <Field
                                                    className="relative"
                                                    orientation="horizontal"
                                                >
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-8 absolute top-0 right-0 m-2"
                                                            >
                                                                <MoreVertical className="size-4" />
                                                                <span className="sr-only">
                                                                    Open menu
                                                                </span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    modal.openEdit(
                                                                        role,
                                                                    )
                                                                }
                                                            >
                                                                <SquarePen />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    modal.openDelete(
                                                                        role.id,
                                                                    )
                                                                }
                                                                variant="destructive"
                                                            >
                                                                <Trash2 />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <FieldContent>
                                                        <FieldTitle className="capitalize mb-2">
                                                            {role.name}
                                                            {role.is_system && (
                                                                <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                                                    Sistem
                                                                </Badge>
                                                            )}
                                                        </FieldTitle>
                                                        <FieldDescription className="text-xs mb-2">
                                                            {role?.description ??
                                                                "-"}
                                                        </FieldDescription>
                                                        <div className="flex gap-4 justify-between">
                                                            <FieldDescription className="text-xs flex items-center gap-2">
                                                                <UsersRound className="size-4" />{" "}
                                                                {
                                                                    role.total_users
                                                                }{" "}
                                                                Pengguna
                                                            </FieldDescription>
                                                            <FieldDescription className="text-xs">
                                                                {
                                                                    role.total_permissions
                                                                }{" "}
                                                                Perizinan
                                                            </FieldDescription>
                                                        </div>
                                                    </FieldContent>
                                                    <RadioGroupItem
                                                        className="hidden"
                                                        value={String(role.id)}
                                                        id={role.name}
                                                    />
                                                </Field>
                                            </FieldLabel>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-2 flex flex-col gap-4">
                        {!!selected ? (
                            Object.entries(permissions).map(
                                (permission: any) => (
                                    <Card
                                        className="bg-muted/50 p-0"
                                        key={permission[0]}
                                    >
                                        <CardContent className="p-0">
                                            <Collapsible>
                                                <CollapsibleTrigger asChild>
                                                    <Button
                                                        size="lg"
                                                        variant="ghost"
                                                        className="group w-full text-lg capitalize"
                                                    >
                                                        <Shield /> Perizinan :{" "}
                                                        {permission[0]}
                                                        <Badge
                                                            className="rounded-full"
                                                            variant="outline"
                                                        >
                                                            {
                                                                Object.values(
                                                                    permission[1],
                                                                ).flat().length
                                                            }{" "}
                                                            perizinan
                                                        </Badge>
                                                        <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <FieldGroup className="flex flex-col gap-2 p-4">
                                                        {Object.entries(
                                                            permission[1],
                                                        ).map((p: any) => {
                                                            if (
                                                                Object.entries(
                                                                    p[1],
                                                                ).length === 1
                                                            ) {
                                                                const singleScope =
                                                                    p[1][0];

                                                                return (
                                                                    <SelectPermissionToggle
                                                                        key={
                                                                            singleScope.id
                                                                        }
                                                                        p={
                                                                            singleScope
                                                                        }
                                                                        handleChangePermission={
                                                                            handleChangePermission
                                                                        }
                                                                        selected={
                                                                            selected
                                                                        }
                                                                    />
                                                                );
                                                            } else if (
                                                                Object.entries(
                                                                    p[1],
                                                                ).length > 1
                                                            ) {
                                                                const multiScope =
                                                                    p[1];
                                                                return (
                                                                    <SelectScopePermission
                                                                        key={
                                                                            p[1][0]
                                                                                .id
                                                                        }
                                                                        scopes={
                                                                            multiScope
                                                                        }
                                                                        handleChangeScopePermission={
                                                                            handleChangeScopePermission
                                                                        }
                                                                        selected={
                                                                            selected
                                                                        }
                                                                    />
                                                                );
                                                            } else {
                                                                return;
                                                            }
                                                        })}
                                                    </FieldGroup>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </CardContent>
                                    </Card>
                                ),
                            )
                        ) : (
                            <Card className="bg-muted/50">
                                <CardContent className="text-center">
                                    Silahkan pilih role terlebih dahulu
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

RolePage.layout = {
    breadcrumbs: [
        {
            title: "Role",
            href: roleIndex(),
        },
    ],
};
