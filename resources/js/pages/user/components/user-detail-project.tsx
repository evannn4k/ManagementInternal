import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProjectGridType } from "@/types/data/project";
import {
    CalendarDays,
    ArrowRight,
    FolderGit2,
    Users,
    PackageOpen,
} from "lucide-react";
import { detail as detailProject } from "@/routes/project";
import { Progress } from "@/components/ui/progress";
import { Link } from "@inertiajs/react";

export function UserDetailProject({
    projects,
}: {
    projects: ProjectGridType[];
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg text-foreground font-semibold">
                Proyek Diikuti Teratas
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.length > 0 ? (
                    projects.map((project) => (
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
                                            </CardTitle>{" "}
                                            <CardDescription className="text-xs text-muted-foreground">
                                                Pemilik : {project.pic.name}
                                            </CardDescription>
                                        </div>
                                    </div>
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
                                            <span>
                                                66% <span>(2/3 tugas)</span>
                                            </span>
                                        </div>
                                        <Progress value={66} />
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
                    ))
                ) : (
                    <div className="col-span-1 md:col-span-4 w-full text-center flex flex-col items-center justify-center gap-2 py-4">
                        <PackageOpen />
                        <CardDescription>Belum ada proyek.</CardDescription>
                    </div>
                )}
                {projects.length > 0 && (
                    <Card className="bg-muted/50 hover:bg-muted/70 h-full gap-2">
                        <CardContent className="h-full flex items-center justify-center">
                            <Link href="/project">
                                <CardDescription className="flex items-center">
                                    Lihat selengkapnya{" "}
                                    <ArrowRight className="size-4 ms-2" />{" "}
                                </CardDescription>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
