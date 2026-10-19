import { Head, usePage } from "@inertiajs/react";
import { index as userIndex } from "@/routes/user";
import { User } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    CalendarDays,
    FolderPen,
    LayersPlus,
    Shield,
    UserRound,
} from "lucide-react";
import { formatDate, getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemActions,
    ItemTitle,
} from "@/components/ui/item";
import { UserDetailProject } from "./components/user-detail-project";
import { ProjectGridType } from "@/types/data/project";
import { UserDetailTask } from "./components/user-detail-task";
import { TaskSummaryType, TaskType } from "@/types/data/task";
import { Button } from "@/components/ui/button";

export default function UserDetail({
    data,
    projects,
    taskSummary,
    tasks,
}: {
    data: User;
    projects: ProjectGridType[];
    taskSummary: TaskSummaryType;
    tasks: TaskType[];
}) {
    const { auth } = usePage().props;
    return (
        <>
            <Head title={data.name} />
            <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-muted/50 col-span-1 md:col-span-2">
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="">
                                    <Avatar className="size-20 border rounded-xl overflow-hidden">
                                        <AvatarFallback className="bg-primary/10 font-semibold text-2xl text-primary rounded-none">
                                            {data.name ? (
                                                getInitials(data.name)
                                            ) : (
                                                <UserRound className="size-5" />
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 items-center capitalize">
                                        <CardTitle className="text-3xl font-bold">
                                            {data.name}
                                        </CardTitle>
                                        <Badge>{data.role}</Badge>
                                    </div>
                                    <CardDescription className="flex gap-6 items-center">
                                        <span>{data.email}</span>
                                        <span>0812 3456 7890</span>

                                        {data.position && <>{data.position}</>}
                                    </CardDescription>
                                </div>
                            </div>
                            <Item variant="muted" className="bg-muted/50">
                                <ItemContent className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-between">
                                    <div className="flex flex-col gap-2">
                                        <ItemDescription className="text-xs">
                                            Tanggal Bergabung
                                        </ItemDescription>
                                        <ItemTitle>
                                            <CalendarDays className="size-4" />{" "}
                                            {formatDate(data.created_at)}
                                        </ItemTitle>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <ItemDescription className="text-xs">
                                            Terakhir Login
                                        </ItemDescription>
                                        <ItemTitle>
                                            {data?.last_login_at
                                                ? formatDate(
                                                      data?.last_login_at as string,
                                                  )
                                                : "-"}
                                        </ItemTitle>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <ItemDescription className="text-xs">
                                            Status
                                        </ItemDescription>
                                        <ItemTitle>
                                            {data.is_active ? (
                                                <>
                                                    <Badge>Aktif</Badge>
                                                </>
                                            ) : (
                                                <>
                                                    <Badge variant="destructive">
                                                        Non-aktif
                                                    </Badge>
                                                </>
                                            )}
                                        </ItemTitle>
                                    </div>
                                </ItemContent>
                            </Item>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardContent className="flex flex-col gap-3">
                            <Item variant="muted" className="p-3">
                                <ItemContent className="gap-0">
                                    <ItemDescription className="text-xs">
                                        Memiliki Proyek
                                    </ItemDescription>
                                    <ItemTitle>
                                        {data?.total_pic ?? 0} proyek
                                    </ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <FolderPen />
                                </ItemActions>
                            </Item>
                            <Item variant="muted" className="p-3">
                                <ItemContent className="gap-0">
                                    <ItemDescription className="text-xs">
                                        Total Membuat Proyek
                                    </ItemDescription>
                                    <ItemTitle>
                                        {data?.total_create_project ?? 0} proyek
                                    </ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <LayersPlus />
                                </ItemActions>
                            </Item>
                            <Item variant="muted" className="p-3">
                                <ItemContent className="gap-0">
                                    <ItemDescription className="text-xs">
                                        Total Perizinan
                                    </ItemDescription>
                                    <ItemTitle>
                                        {auth.user.permissions?.length ?? 0}{" "}
                                        perizinan
                                    </ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <Shield />
                                </ItemActions>
                            </Item>
                        </CardContent>
                    </Card>
                </div>
                <UserDetailProject projects={projects} />
                <UserDetailTask
                    tasks={tasks}
                    name={data.name}
                    taskSummary={taskSummary}
                />
            </div>
        </>
    );
}

UserDetail.layout = (props: any) => ({
    breadcrumbs: [
        {
            title: "User",
            href: userIndex(),
        },
        {
            title: props?.data?.name ?? "",
        },
    ],
});
