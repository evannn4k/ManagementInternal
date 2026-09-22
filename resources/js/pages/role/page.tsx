import { Button } from "@/components/ui/button";
import {
    ChevronDownIcon,
    CircleCheck,
    Plus,
    SearchIcon,
    Shield,
    ShieldCheck,
    UsersRound,
} from "lucide-react";
import { index as role } from "@/routes/role";
import { useModal } from "@/hooks/use-modal";
import { Permission, Role } from "@/types/data/role";
import { DeleteAlert } from "@/components/delete-alert";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import syncRole from "@/actions/App/Http/Controllers/Role/SyncRolePermissionController";

export default function RolePage({
    roles,
    permissions,
}: {
    roles: { data: Role[] };
    permissions: any[];
}) {
    const [selected, setSelected] = useState<number[]>();
    const [roleId, setRoleId] = useState<number>();

    const handleSyncPermission = (): void => {
        // if (!roleId) return;

        console.log(roleId);
        console.log(selected);

        router.put(syncRole(roleId), {
            permissions_id: selected,
        });
    };

    const handleChangePermission = (checked: boolean, value: number): void => {
        if (!selected) return;

        if (checked) {
            setSelected([...selected, value]);
        } else {
            setSelected(selected.filter((s) => s !== value));
        }
    };

    return (
        <>
            <Head title="User" />
            <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                <header className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center text-sm">
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
                    <Button onClick={handleSyncPermission}>
                        <CircleCheck />
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
                                    <Button size="sm">
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
                                        defaultValue="admin"
                                        onValueChange={(selectedRoleRadio) => {
                                            const selectedRole:
                                                Role | undefined =
                                                roles.data.find((r) => {
                                                    return (
                                                        r.id ==
                                                        Number(
                                                            selectedRoleRadio,
                                                        )
                                                    );
                                                });

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
                                                htmlFor={role.name}
                                                key={role.id}
                                            >
                                                <Field orientation="horizontal">
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
                    <div className="col-span-2 flex flex-col gap-4 md:gap-6">
                        {!!selected ? (
                            Object.entries(permissions).map(
                                (permission: any) => (
                                    <Card
                                        className="bg-muted/50"
                                        key={permission[0]}
                                    >
                                        <CardContent>
                                            <Collapsible>
                                                <CollapsibleTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="group w-full text-lg capitalize"
                                                    >
                                                        <Shield /> Perizinan :{" "}
                                                        {permission[0]}{" "}
                                                        <Badge
                                                            className="rounded-full"
                                                            variant="outline"
                                                        >
                                                            {
                                                                permission[1]
                                                                    .length
                                                            }{" "}
                                                            perizinan
                                                        </Badge>
                                                        <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <FieldGroup className="flex flex-col gap-2 mt-2">
                                                        {permission[1].map(
                                                            (p: Permission) => (
                                                                <FieldLabel
                                                                    key={p.id}
                                                                    htmlFor={
                                                                        p.name
                                                                    }
                                                                    className="p-0 m-0"
                                                                >
                                                                    <Field orientation="horizontal">
                                                                        <FieldContent className="flex flex-col gap-1">
                                                                            <FieldTitle className="text-xs capitalize">
                                                                                {p.name.replaceAll(
                                                                                    ".",
                                                                                    " ",
                                                                                )}
                                                                            </FieldTitle>
                                                                            <FieldDescription className="text-sm">
                                                                                {p?.description ??
                                                                                    "-"}
                                                                            </FieldDescription>
                                                                        </FieldContent>
                                                                        <Switch
                                                                            checked={selected!.includes(
                                                                                p!
                                                                                    .id,
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked,
                                                                            ) =>
                                                                                handleChangePermission(
                                                                                    checked,
                                                                                    p.id,
                                                                                )
                                                                            }
                                                                            id={
                                                                                p.name
                                                                            }
                                                                        />
                                                                    </Field>
                                                                </FieldLabel>
                                                            ),
                                                        )}
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
            href: role(),
        },
    ],
};
