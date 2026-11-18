import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TaskType } from "@/types/data/task";
import { DashboardTaskCard } from "./dashboard-task-card";
import { Empty, EmptyContent, EmptyDescription } from "@/components/ui/empty";

export function DashboardSectionTask({
    overdue,
    thisWeek,
    pending,
}: {
    overdue: TaskType[];
    thisWeek: TaskType[];
    pending: TaskType[];
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <span className="relative flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                        </span>
                        <span>Tugas Terlambat</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                        4 Tugas teratas
                    </CardDescription>
                    <CardAction>
                        <Badge variant="destructive">
                            {overdue.length ?? 0}
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3 w-full">
                    {overdue.length > 1 ? (
                        overdue.map((task) => (
                            <DashboardTaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <Empty>
                            <EmptyContent>
                                <EmptyDescription>
                                    Belum ada tugas
                                </EmptyDescription>
                            </EmptyContent>
                        </Empty>
                    )}
                </CardContent>
            </Card>
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <span>Tenggat Minggu Ini</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                        4 Tugas teratas
                    </CardDescription>
                    <CardAction>
                        <Badge variant="outline">{thisWeek.length ?? 0}</Badge>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3 w-full">
                    {thisWeek.length > 1 ? (
                        thisWeek.map((task) => (
                            <DashboardTaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <Empty>
                            <EmptyContent>
                                <EmptyDescription>
                                    Belum ada tugas
                                </EmptyDescription>
                            </EmptyContent>
                        </Empty>
                    )}
                </CardContent>
            </Card>
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <span>Direncanakan Nanti</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                        4 Tugas teratas
                    </CardDescription>
                    <CardAction>
                        <Badge variant="outline">{pending.length ?? 0}</Badge>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3 w-full">
                    {pending.length > 1 ? (
                        pending.map((task) => (
                            <DashboardTaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <Empty>
                            <EmptyContent>
                                <EmptyDescription>
                                    Belum ada tugas
                                </EmptyDescription>
                            </EmptyContent>
                        </Empty>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
