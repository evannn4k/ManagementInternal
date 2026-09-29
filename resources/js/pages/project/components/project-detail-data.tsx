import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectType } from "@/types/data/project";
import {
    CalendarClock,
    Check,
    Copy,
    GitBranch,
    Target,
    UserRound,
} from "lucide-react";
import { formatDate, getInitials } from "@/lib/utils";
import { IconBox } from "@/components/icon";

const avatarColor = [
    "bg-blue-500/20 text-blue-600 dark:text-blue-300",
    "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300",
    "bg-violet-500/20 text-violet-600 dark:text-violet-300",
    "bg-amber-500/20 text-amber-600 dark:text-amber-300",
    "bg-rose-500/20 text-rose-600 dark:text-rose-300",
];

const priorityColor: Record<
    string,
    { label: string; variant: "destructive" | "yellow" | "green" }
> = {
    high: { label: "High", variant: "destructive" },
    medium: { label: "Medium", variant: "yellow" },
    low: { label: "Low", variant: "green" },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {children}
        </p>
    );
}

export function ProjectDetailData({ project }: { project: ProjectType }) {
    const [copied, setCopied] = useState(false);

    const priority = priorityColor[project.priority] ?? priorityColor.low;
    const teams = project.teams ?? [];
    const visibleTeams = teams.slice(0, 3);
    const hiddenCount = teams.length - visibleTeams.length;

    const handleCopy = async () => {
        if (!project.repo_url) return;
        try {
            await navigator.clipboard.writeText(project.repo_url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <Card className="bg-muted/50">
            <CardContent className="space-y-4">
                {/* Baris atas: PIC | Git | Prioritas | Deadline */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x">
                    {/* PIC */}
                    <div className="flex items-center gap-3 lg:pr-6">
                        <Avatar className="size-11 border">
                            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                                {project.pic?.name ? (
                                    getInitials(project.pic.name)
                                ) : (
                                    <UserRound className="size-5" />
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-2">
                                <SectionLabel>PIC Proyek</SectionLabel>
                                {project.pic?.roles?.[0]?.name && (
                                    <Badge
                                        variant="secondary"
                                        className="h-4 px-1.5 text-[10px] capitalize"
                                    >
                                        {project.pic?.roles?.[0]?.name}
                                    </Badge>
                                )}
                            </div>
                            <p className="truncate text-sm font-semibold">
                                {project.pic?.name ?? "-"}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                {project.pic?.position ?? "-"}
                            </p>
                        </div>
                    </div>

                    {/* Git */}
                    <div className="flex items-center gap-3 lg:px-6">
                        <IconBox>
                            <GitBranch className="size-5" />
                        </IconBox>
                        <div className="min-w-0 space-y-0.5">
                            <SectionLabel>Git</SectionLabel>
                            <p className="text-sm font-semibold">
                                Branch:{" "}
                                <span className="font-mono text-primary">
                                    {project.branch ?? "-"}
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Repository proyek
                            </p>
                        </div>
                    </div>

                    {/* Prioritas */}
                    <div className="flex items-center gap-3 lg:px-6">
                        <IconBox>
                            <Target className="size-5" />
                        </IconBox>
                        <div className="space-y-1">
                            <SectionLabel>Prioritas</SectionLabel>
                            <Badge
                                variant={priority.variant}
                                className="rounded-full"
                            >
                                {priority.label}
                            </Badge>
                        </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-3 lg:pl-6">
                        <IconBox>
                            <CalendarClock className="size-5" />
                        </IconBox>
                        <div className="space-y-0.5">
                            <SectionLabel>Target Selesai</SectionLabel>
                            <p className="text-sm font-semibold">
                                {formatDate(project.end_date)}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Objektif */}
                <p className="text-sm">
                    <span className="mr-2 font-medium text-muted-foreground">
                        Deskripsi :
                    </span>
                    <span className="text-muted-foreground">
                        {project.description || "-"}
                    </span>
                </p>

                {/* Footer: Tim + Repo */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <SectionLabel>Tim ({teams.length})</SectionLabel>
                        {teams.length > 0 ? (
                            <div className="flex -space-x-2">
                                {visibleTeams.map((member, index) => (
                                    <Avatar
                                        key={member.id}
                                        className="size-8 border-2 border-background"
                                        title={member.name}
                                    >
                                        <AvatarFallback
                                            className={`text-xs font-semibold ${
                                                avatarColor[
                                                    index % avatarColor.length
                                                ]
                                            }`}
                                        >
                                            {getInitials(member.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                                {hiddenCount > 0 && (
                                    <Avatar className="size-8 border-2 border-background">
                                        <AvatarFallback className="bg-muted text-xs font-semibold">
                                            +{hiddenCount}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ) : (
                            <span className="text-xs text-muted-foreground">
                                Belum ada anggota
                            </span>
                        )}
                    </div>

                    {project.repo_url && (
                        <div className="flex items-center gap-1 rounded-md border bg-background px-3 py-1.5">
                            <GitBranch className="size-3.5 shrink-0 text-muted-foreground" />
                            <a
                                href={project.repo_url}
                                target="_blank"
                                className="font-mono text-xs hover:underline"
                            >
                                {project.repo_url}
                            </a>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-6"
                                onClick={handleCopy}
                                aria-label="Salin URL repository"
                            >
                                {copied ? (
                                    <Check className="size-3.5 text-green-500" />
                                ) : (
                                    <Copy className="size-3.5" />
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}