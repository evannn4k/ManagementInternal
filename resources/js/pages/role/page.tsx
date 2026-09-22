import { Button } from "@/components/ui/button";
import {
    CircleCheck,
    Plus,
    SearchIcon,
    Shield,
    ShieldCheck,
} from "lucide-react";
import { index as role } from "@/routes/role";
import { useModal } from "@/hooks/use-modal";
import { Permission, Role } from "@/types/data/role";
import { DeleteAlert } from "@/components/delete-alert";
import { Head } from "@inertiajs/react";
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
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RolePage({
    roles,
    permissions,
}: {
    roles: Role;
    permissions: Permission[];
}) {
    // const [query, setQuery] = useState<{
    //     search: string;
    //     role: string;
    //     status: string;
    //     per_page: number;
    // }>();
    // const { url } = userIndex();
    console.log("roles");
    console.log(roles);
    console.log("permissions");
    console.log(permissions);
    const modal = useModal();

    // const updateQuery = (params: Record<string, any>) => {
    //     const updated = { ...query, ...params };

    //     setQuery(updated as any);
    //     const urlQuery = userIndex({ query: updated });

    //     router.get(
    //         urlQuery.url,
    //         {},
    //         {
    //             preserveState: true,
    //             preserveScroll: true,
    //             replace: true,
    //         },
    //     );
    // };

    // const handleDelete = (id: number) => {
    //     router.delete(userDelete({ id: id }));
    // };

    return (
        <>
            <Head title="User" />
            {/*<DeleteAlert
                modal={modal}
                title="Hapus data user"
                description="Data user yang telah dihapus dapat dikembalikan."
                handleDelete={handleDelete}
            />*/}
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
                    <Button onClick={() => modal.openCreate()}>
                        <CircleCheck />
                        Simmpan Perubahan
                    </Button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <Card className="col-span-1 bg-muted/50">
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
                                    defaultValue="plus"
                                    className="max-w-sm"
                                >
                                    {roles.map((role) => (
                                        <FieldLabel htmlFor="plus-plan">
                                            <Field orientation="horizontal">
                                                <FieldContent>
                                                    <FieldTitle>
                                                        Plus
                                                    </FieldTitle>
                                                    <FieldDescription>
                                                        For individuals and
                                                        small teams.
                                                    </FieldDescription>
                                                </FieldContent>
                                                <RadioGroupItem
                                                    value="plus"
                                                    id="plus-plan"
                                                />
                                            </Field>
                                        </FieldLabel>
                                    ))}
                                </RadioGroup>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="col-span-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nihil, esse, provident aperiam perferendis vitae autem
                        porro aliquam est ea voluptas commodi animi qui incidunt
                        optio in eligendi iste repudiandae quibusdam?
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
