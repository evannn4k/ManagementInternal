import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link, router } from "@inertiajs/react";
import {
    Archive,
    CalendarDays,
    FileText,
    FolderGit2,
    MoreVertical,
    PackageOpen,
    SquarePen,
    Trash2,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProjectGridType } from "@/types/data/project";
import { UseModalReturn } from "@/types/modal";
import { detail as detailProject } from "@/routes/project";
import { archive as archiveProject } from "@/routes/project";

import { Item, ItemContent, ItemDescription } from "@/components/ui/item";

export function ProjectGrid({
    modal,
    projects,
}: {
    modal: UseModalReturn;
    projects: ProjectGridType[];
}) {
    
    const handleArchiveProject = (id: string) => {
        router.patch(
            archiveProject(id).url,
            {},
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <>
            {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projects.map((project) => {
                        const totalCompleted = project.statuses
                            .filter((status) => status.type == "completed")
                            .map((status) => status.total_task)
                            .reduce(
                                (total, value) => (total ?? 0) + (value ?? 0),
                            );

                        const completedPercentage =
                            totalCompleted && project.total_task
                                ? Math.round(
                                      (totalCompleted / project.total_task) *
                                          100,
                                  )
                                : 0;

                        return (
                            <Link
                                href={detailProject.url(project.id)}
                                key={project.id}
                                className="h-full"
                            >
                                <Card className="bg-muted/50 hover:bg-muted/70 transition-all h-full gap-2">
                                    <CardHeader>
                                        <div className="flex flex-row items-center space-y-0 gap-2">
                                            <div className="bg-primary/10 p-2 rounded-md text-primary border border-primary/20">
                                                <FolderGit2 />
                                            </div>
                                            <div className="flex flex-col gap-0">
                                                <CardTitle className="line-clamp-1">
                                                    {project.name}
                                                </CardTitle>
                                                <CardDescription className="text-xs text-muted-foreground">
                                                    Pemilik : {project.pic.name}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <CardAction>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8"
                                                    >
                                                        <MoreVertical className="size-4" />
                                                        <span className="sr-only">
                                                            Open menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            modal.openEdit(
                                                                project,
                                                            );
                                                        }}
                                                    >
                                                        <SquarePen />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={
                                                                detailProject(
                                                                    project.id,
                                                                ).url
                                                            }
                                                        >
                                                            <FileText />
                                                            Detail
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleArchiveProject(
                                                                    project.id,
                                                                );
                                                            }}
                                                            variant="destructive"
                                                        >
                                                            <Archive />
                                                            Archive
                                                        </DropdownMenuItem>
                                                    </>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </CardAction>
                                    </CardHeader>
                                    <CardContent className="flex flex-col h-full">
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                className="rounded-full capitalize"
                                                variant={
                                                    project.priority == "high"
                                                        ? "destructive"
                                                        : project.priority ==
                                                            "medium"
                                                          ? "yellow"
                                                          : "green"
                                                }
                                            >
                                                {project.priority}
                                            </Badge>
                                            <Badge
                                                className="rounded-full capitalize"
                                                variant="default"
                                            >
                                                {project.status}
                                            </Badge>
                                        </div>
                                        <div className="py-2 mb-auto">
                                            <CardDescription className="line-clamp-3 overflow-hidden">
                                                {project.description}
                                            </CardDescription>
                                        </div>
                                        <div className="mt-auto">
                                            <div className="text-xs text-muted-foreground flex gap-2 items-center mb-2 justify-between">
                                                <span>Penyelesaian Tugas</span>
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        {completedPercentage}%
                                                    </span>
                                                    <span>
                                                        ({totalCompleted}/
                                                        {project.total_task}{" "}
                                                        tugas)
                                                    </span>
                                                </div>
                                            </div>
                                            <Progress
                                                value={completedPercentage}
                                            />
                                            <div className="flex justify-between items-center gap-4 pt-4">
                                                <div className="flex items-center gap-2">
                                                    <Users className="size-4" />
                                                    {project?.teams?.length ??
                                                        0}{" "}
                                                    Anggota
                                                </div>
                                                <div className="flex gap-1 items-center text-xs text-muted-foreground">
                                                    <CalendarDays className="size-4" />{" "}
                                                    {project.start_date}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <Item className="w-full flex justify-center rounded-xl">
                    <ItemContent>
                        <div className="text-center flex flex-col items-center justify-center gap-2 py-4">
                            <PackageOpen />
                            <ItemDescription>
                                Tidak ada data proyek.
                            </ItemDescription>
                        </div>
                    </ItemContent>
                </Item>
            )}
        </>
    );
}
