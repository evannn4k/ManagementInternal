import ProjectDetailLayout from "./project-detail-layout";
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
    CalendarDays,
    Check,
    ChevronDown,
    CircleCheck,
    SquareKanban,
    InfoIcon,
    Pencil,
    Play,
    Plus,
    RefreshCw,
    RefreshCwOff,
    Search,
    SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import SprintForm from "./components/sprint-form";
import { useModal } from "@/hooks/use-modal";
import { ProjectType } from "@/types/data/project";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { router } from "@inertiajs/react";
import { changeStatus } from "@/routes/project/sprint";

export default function ProjectDetailSprint({
    project,
    sprints,
}: {
    project: ProjectType;
    sprints: SprintType[];
}) {
    const modal = useModal();

    const activeSprint = sprints.filter((s) => s.status == "active");

    const handleChangeStatus = (id: string, status: string) => {
        router.patch(
            changeStatus.url({ project: project.id, sprint: id }),
            { status: status },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <>
            <SprintForm project={project} modal={modal} />
            <Card className="bg-muted/50">
                <CardContent className="flex w-full flex-col gap-6 pb-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <RefreshCw className="size-4" />
                                Sprint
                            </CardTitle>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Kelola siklus kerja tim · Aplikasi Internal PM
                            </p>
                        </div>
                        <Button onClick={() => modal.openCreate()}>
                            <Plus />
                            Tambah Sprint
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <Tabs defaultValue="all">
                            <TabsList>
                                <TabsTrigger value="all">Semua 2</TabsTrigger>
                                <TabsTrigger value="active">
                                    Aktif 1
                                </TabsTrigger>
                                <TabsTrigger value="planned">
                                    Direncanakan 1
                                </TabsTrigger>
                                <TabsTrigger value="completed">
                                    Selesai 0
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <InputGroup className="max-w-xs bg-background">
                            <InputGroupInput placeholder="Search..." />
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    {activeSprint.length > 0 ? (
                        activeSprint.map((sprint) => {
                            const completeTaskPercentation =
                                sprint.tasks_done &&
                                sprint.tasks_total &&
                                sprint.tasks_total > 0
                                    ? Math.round(
                                          (sprint.tasks_done /
                                              sprint.tasks_total) *
                                              100,
                                      )
                                    : 0;

                            return (
                                <section className="space-y-3">
                                    <h2 className="text-sm font-semibold">
                                        Sprint Aktif
                                    </h2>

                                    <Card className="gap-5 rounded-xl py-6 shadow-sm">
                                        <CardHeader className="gap-1.5">
                                            <div className="flex items-start justify-between gap-3">
                                                <CardTitle className="text-xl leading-snug">
                                                    Sprint {sprint.number}
                                                    {" · "}
                                                    {sprint.name}{" "}
                                                </CardTitle>
                                                <Badge className="rounded-full px-2.5">
                                                    {sprint.status}
                                                </Badge>
                                            </div>
                                            <CardDescription className="leading-relaxed">
                                                {sprint.description}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                                                <CalendarDays className="size-4" />
                                                <span>
                                                    {sprint.start_date} –{" "}
                                                    {sprint.end_date}{" "}
                                                </span>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="text-muted-foreground flex items-center justify-between text-xs">
                                                    <span>
                                                        {sprint.tasks_done ?? 0}
                                                        /
                                                        {sprint.tasks_total ??
                                                            0}{" "}
                                                        task selesai{" "}
                                                    </span>
                                                    <span className="text-foreground font-semibold">
                                                        {
                                                            completeTaskPercentation
                                                        }
                                                        %{" "}
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={
                                                        completeTaskPercentation
                                                    }
                                                    className="h-1.5"
                                                />
                                            </div>
                                        </CardContent>

                                        <CardFooter className="gap-2">
                                            <Button variant="outline" size="sm">
                                                <SquareKanban />
                                                Buka Kanban
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8"
                                                aria-label="Edit sprint"
                                            >
                                                <Pencil />
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="ml-auto"
                                            >
                                                <Check />
                                                Selesaikan
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </section>
                            );
                        })
                    ) : (
                        <Alert>
                            <InfoIcon />
                            <AlertTitle>
                                Tidak ada sprint yang sedang berjalan!
                            </AlertTitle>
                            <AlertDescription className="text-xs flex">
                                Pilih salah satu sprint di bawah lalu klik
                                <span className="font-semibold">Mulai</span>
                                untuk memulai siklus kerja baru.
                            </AlertDescription>
                        </Alert>
                    )}

                    <section className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold">
                                Sprint Lainnya
                            </h2>
                            <span className="text-muted-foreground text-xs">
                                Tombol Mulai nonaktif selama ada sprint aktif
                            </span>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {sprints.map((sprint) => {
                                const completeTaskPercentation =
                                    sprint.tasks_done &&
                                    sprint.tasks_total &&
                                    sprint.tasks_total > 0
                                        ? Math.round(
                                              (sprint.tasks_done /
                                                  sprint.tasks_total) *
                                                  100,
                                          )
                                        : 0;

                                return (
                                    <Card
                                        className="gap-4 rounded-xl shadow-none"
                                        key={sprint.id}
                                    >
                                        <CardHeader className="gap-1.5">
                                            <div className="flex items-start justify-between gap-3">
                                                <CardTitle className="text-base leading-snug">
                                                    Sprint {sprint.number}
                                                    {" · "}
                                                    {sprint.name}
                                                </CardTitle>
                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-full px-2.5"
                                                >
                                                    {sprint.status}
                                                </Badge>
                                            </div>
                                            <CardDescription className="leading-relaxed text-xs line-clamp-3">
                                                {sprint.description}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                                                <CalendarDays className="size-4" />
                                                <span>
                                                    {sprint.start_date} –{" "}
                                                    {sprint.end_date}
                                                </span>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="text-muted-foreground flex items-center justify-between text-xs">
                                                    <span>
                                                        {sprint.tasks_done ?? 0}
                                                        /
                                                        {sprint.tasks_total ??
                                                            0}{" "}
                                                        task selesai
                                                    </span>
                                                    <span className="text-foreground font-semibold">
                                                        {
                                                            completeTaskPercentation
                                                        }
                                                        %
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={
                                                        completeTaskPercentation
                                                    }
                                                    className="h-1"
                                                />
                                            </div>
                                        </CardContent>

                                        <CardFooter className="gap-2">
                                            <Button variant="outline" size="sm">
                                                <SquareKanban />
                                                Buka Kanban
                                            </Button>
                                            {sprint.status != "completed" && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                    aria-label="Edit sprint"
                                                    onClick={() =>
                                                        modal.openEdit(sprint)
                                                    }
                                                >
                                                    <Pencil />
                                                </Button>
                                            )}
                                            {sprint.status == "active" ? (
                                                <Button
                                                    size="sm"
                                                    className="ml-auto"
                                                    onClick={() =>
                                                        handleChangeStatus(
                                                            sprint.id,
                                                            "completed",
                                                        )
                                                    }
                                                >
                                                    <Check />
                                                    Selesaikan
                                                </Button>
                                            ) : sprint.status == "planned" ? (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="ml-auto"
                                                    disabled={Boolean(
                                                        activeSprint.length > 0,
                                                    )}
                                                    onClick={() =>
                                                        handleChangeStatus(
                                                            sprint.id,
                                                            "active",
                                                        )
                                                    }
                                                >
                                                    <Play />
                                                    Mulai
                                                </Button>
                                            ) : null}
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    </section>
                </CardContent>
            </Card>
        </>
    );
}

ProjectDetailSprint.layout = (page: any) => {
    const project = page.project ?? page.props.project;

    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};
