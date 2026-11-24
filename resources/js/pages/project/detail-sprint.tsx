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
    Columns3,
    InfoIcon,
    Pencil,
    Play,
    Plus,
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

export default function ProjectDetailSprint({
    project,
    sprints,
}: {
    project: ProjectType;
    sprints: SprintType[];
}) {
    const modal = useModal();

    console.log(sprints);

    return (
        <>
            <SprintForm project={project} modal={modal} />
            <Card className="bg-muted/50">
                <CardContent className="flex w-full flex-col gap-6 pb-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sprint
                            </h1>
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

                    {/* Sprint Aktif */}
                    {/*<section className="space-y-3">
                        <h2 className="text-sm font-semibold">Sprint Aktif</h2>

                        <Card className="gap-5 rounded-xl py-6 shadow-sm">
                            <CardHeader className="gap-1.5">
                                <div className="flex items-start justify-between gap-3">
                                    <CardTitle className="text-xl leading-snug">
                                        Sprint 12 · Revamp Checkout
                                    </CardTitle>
                                    <Badge className="rounded-full px-2.5">
                                        Active
                                    </Badge>
                                </div>
                                <CardDescription className="leading-relaxed">
                                    Menyederhanakan alur checkout dari 5 langkah
                                    menjadi 3 langkah.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                                    <CalendarDays className="size-4" />
                                    <span>11 Nov 2026 – 25 Nov 2026</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-muted-foreground flex items-center justify-between text-xs">
                                        <span>18/26 task selesai</span>
                                        <span className="text-foreground font-semibold">
                                            69%
                                        </span>
                                    </div>
                                    <Progress value={69} className="h-1.5" />
                                </div>
                            </CardContent>

                            <CardFooter className="gap-2">
                                <Button variant="outline" size="sm">
                                    <Columns3 />
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
                                <Button size="sm" className="ml-auto">
                                    <Check />
                                    Selesaikan
                                </Button>
                            </CardFooter>
                        </Card>
                    </section>*/}

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
                        {/*<AlertAction>
                            <Button variant="outline">Tambahkan</Button>
                        </AlertAction>*/}
                    </Alert>

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
                                                    Sprint {sprint.number} -
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
                                                        {sprint.tasks_total ??
                                                            0}
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
                                                <Columns3 />
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
                                                variant="outline"
                                                size="sm"
                                                className="ml-auto"
                                                disabled
                                            >
                                                <Play />
                                                Mulai
                                            </Button>
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
