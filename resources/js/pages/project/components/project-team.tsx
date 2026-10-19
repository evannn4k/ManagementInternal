import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { UserWithRole } from "@/types/data/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { PackageOpen, PenSquare } from "lucide-react";
import ProjectTeamForm from "./project-team-form";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { detail as userDetail } from "@/routes/user";

export default function ProjectTeam({
    teams,
    users,
    projectId,
}: {
    teams: UserWithRole[] | undefined;
    users: UserWithRole[];
    projectId: string;
}) {
    const modal = useModal();

    return (
        <>
            <ProjectTeamForm
                modal={modal}
                teams={teams}
                users={users}
                projectId={projectId}
            />
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle>Anggota & Tim</CardTitle>
                    <CardAction>
                        <Button
                            size="sm"
                            onClick={() => modal.openModal("edit-team", teams)}
                        >
                            <PenSquare /> Edit
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {teams && teams?.length > 0 ? (
                        teams?.map((team) => (
                            <Item
                                key={team.id}
                                className="bg-background p-2"
                                variant="outline"
                                asChild
                            >
                                <Link href={userDetail(team.id).url}>
                                    <ItemMedia>
                                        <Avatar>
                                            <AvatarFallback>
                                                {getInitials(team.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>{team.name}</ItemTitle>
                                        <ItemDescription className="text-xs capitalize">
                                            {team.roles
                                                ? team.roles[0].name
                                                : ""}
                                            {team.roles && team.position
                                                ? " - "
                                                : ""}
                                            {team.position ? team.position : ""}
                                        </ItemDescription>
                                    </ItemContent>
                                </Link>
                            </Item>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-3 text-center flex flex-col items-center justify-center gap-2 py-4">
                            <PackageOpen />
                            <ItemDescription>
                                Belum ada anggota team.
                            </ItemDescription>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
