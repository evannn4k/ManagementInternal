import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { CalendarDays, EllipsisVertical, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import { ProjectGridType } from "@/types/data/project";

export function ProjectGrid({ projects }: { projects: ProjectGridType[] }) {
    console.log(projects);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, i) => (
                <Link href={"/dashboard"} key={project.id}>
                    <Card className="bg-muted/50 hover:bg-muted/70 transition-all">
                        <CardHeader>
                            <div className="flex flex-row items-center space-y-0 gap-2">
                                <div className="bg-primary/10 p-2 rounded-md text-primary border border-primary/20">
                                    <FolderGit2 />
                                </div>
                                <div className="flex flex-col gap-0">
                                    <CardTitle>{project.name}</CardTitle>
                                    <CardDescription className="text-xs text-muted-foreground">
                                        Pemilik : {project.pic.name}
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 py-1">
                                <Badge
                                    className="rounded-full capitalize"
                                    variant="outline"
                                >
                                    {project.priority}
                                </Badge>
                            </div>
                            <CardDescription>
                                {project.description}
                            </CardDescription>
                            <CardAction>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost">
                                            <EllipsisVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>
                                                My Account
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Billing
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                Team
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Subscription
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>{" "}
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground flex gap-2 items-center mb-2 justify-between">
                                <span>Penyelesaian Tugas</span>
                                <span>
                                    66% <span>(2/3 tugas)</span>
                                </span>
                            </div>
                            <Progress value={66} />
                            <div className="flex justify-between items-center gap-4 pt-4 tb-2">
                                <AvatarGroup className="grayscale">
                                    <Avatar size="sm">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Avatar size="sm">
                                        <AvatarImage
                                            src="https://github.com/maxleiter.png"
                                            alt="@maxleiter"
                                        />
                                        <AvatarFallback>LR</AvatarFallback>
                                    </Avatar>
                                    <Avatar size="sm">
                                        <AvatarImage
                                            src="https://github.com/evilrabbit.png"
                                            alt="@evilrabbit"
                                        />
                                        <AvatarFallback>ER</AvatarFallback>
                                    </Avatar>
                                    <AvatarGroupCount>+3</AvatarGroupCount>
                                </AvatarGroup>
                                <div className="flex gap-1 items-center text-xs text-muted-foreground">
                                    <CalendarDays className="size-4" /> {project.start_date}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
