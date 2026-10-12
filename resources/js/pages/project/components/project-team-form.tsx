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
    Trash,
    UserRoundPlus,
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
import { SelectTeam } from "./select-team";
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
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item";
import { IconBox } from "@/components/icon";
import updateTeamProject from "@/actions/App/Http/Controllers/Project/UpdateTeamProjectController";
import { toast } from "sonner";

export default function ProjectForm({
    modal,
    teams,
    users,
    projectId,
}: {
    modal: UseModalReturn;
    teams: UserWithRole[] | undefined;
    users: UserWithRole[];
    projectId: string;
}) {
    const [team, setTeam] = useState<UserWithRole[] | undefined>();

    useEffect(() => {
        setTeam(teams ?? []);
    }, [modal.isOpen("edit-team")]);

    const handleDeleteTeam = (user: UserWithRole) => {
        setTeam((prev: UserWithRole[] | undefined) => {
            if (!prev) return;

            return prev.filter((u) => u.id !== user.id);
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.put(
            updateTeamProject(projectId).url,
            {
                teams: team?.map((t) => t.id) ?? [],
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    modal.closeModal();
                },
                onError: (e) => {
                    setTeam(teams ?? []);
                    toast.error(e.teams);
                },
            },
        );
    };

    return (
        <AlertDialog
            open={modal.isOpen("edit-team")}
            onOpenChange={() => modal.closeModal()}
        >
            <AlertDialogContent className="!max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <IconBox>
                            <PenSquare />
                        </IconBox>

                        <AlertDialogHeader>
                            <AlertDialogTitle>Edit Team</AlertDialogTitle>
                        </AlertDialogHeader>
                    </div>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardAction>
                                <Badge
                                    className="size-sm rounded-full"
                                    variant="outline"
                                >
                                    0 terpilih
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
                                error={false}
                                setTeam={setTeam}
                                users={users}
                                className="w-full bg-background"
                            />
                            {false && (
                                <FieldError className="pt-2">
                                    {false}
                                </FieldError>
                            )}
                            {team && team?.length > 0 ? (
                                <div className="pt-2">
                                    <CardDescription className="ps-2 py-2">
                                        Anggota terpilih :{" "}
                                    </CardDescription>
                                    <div className="flex w-full max-w-md flex-col gap-2">
                                        {team.map((t: UserWithRole) => (
                                            <Item
                                                key={t.id}
                                                variant="outline"
                                                size="sm"
                                                className="bg-background p-2"
                                            >
                                                <ItemContent>
                                                    <ItemTitle>
                                                        {t.name}
                                                    </ItemTitle>
                                                    <ItemDescription>
                                                        {t.position}
                                                    </ItemDescription>
                                                </ItemContent>
                                                <ItemActions>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon-xs"
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            handleDeleteTeam(t)
                                                        }
                                                    >
                                                        <Trash />
                                                    </Button>
                                                </ItemActions>
                                            </Item>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <CardDescription className="text-center pt-4">
                                    Belum ada anggota
                                </CardDescription>
                            )}
                        </CardContent>
                    </Card>

                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button variant="default" type="submit">
                            {/* {processing ? <Spinner /> : <Save />} */}
                            Simpan
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
