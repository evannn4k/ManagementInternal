import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
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
import { PackageOpen, PenSquare, UserRoundX, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { detail as userDetail } from "@/routes/user";
import ProjectTeamForm from "./components/project-team-form";
import ProjectDetailLayout from "./project-detail-layout";
import { ProjectType } from "@/types/data/project";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";

export default function ProjectDetailTeam({
    project,
    users,
}: {
    project: ProjectType;
    users: UserWithRole[];
}) {
    const modal = useModal();

    const { teams } = project;

    return (
        <>
            <ProjectTeamForm
                modal={modal}
                teams={teams}
                users={users}
                projectId={project.id}
            />
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="size-4"/>
                        Anggota & Tim
                    </CardTitle>
                    <CardDescription>
                        Kelola, pantau progres, dan atur alur pengerjaan seluruh
                        task dalam proyek ini.
                    </CardDescription>
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
                                className="bg-background p-2 rounded-xl"
                                variant="outline"
                                asChild
                            >
                                <Link href={userDetail(team.id).url}>
                                    <ItemMedia>
                                        <Avatar className="border-black/30 bg-muted">
                                            <AvatarFallback className="font-semibold text-primary">
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
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <UserRoundX />
                                    </EmptyMedia>
                                    <EmptyTitle>
                                        Belum ada team tertugas.
                                    </EmptyTitle>
                                </EmptyHeader>
                            </Empty>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
}

ProjectDetailTeam.layout = (page: any) => {
    const project = page.project ?? page.props.project;

    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};
