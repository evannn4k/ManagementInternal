import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskSummaryType, TaskType } from "@/types/data/task";
import { Link } from "@inertiajs/react";
import { detail as detailProject } from "@/routes/project";
import { cn } from "@/lib/utils";
import { ArrowRight, PackageOpen } from "lucide-react";

export function UserDetailTask({
    tasks,
    name,
    taskSummary,
}: {
    tasks: TaskType[];
    name: string;
    taskSummary: TaskSummaryType;
}) {
    const tableHead = [
        { label: "judul" },
        { label: "proyek" },
        { label: "prioritas" },
        { label: "status" },
        { label: "tenggat waktu" },
    ];
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg text-foreground font-semibold">
                Ringkasan tugas
            </div>
            <Card className="bg-muted/50 pb-0">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="">
                        <CardTitle className="text-lg">
                            10 tugas terbaru
                        </CardTitle>
                        <CardDescription>
                            Daftar ringkasan tugas dari {name}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="py-4 px-3 rounded-md text-sm"
                        >
                            Total Tugas{" "}
                            <span className="font-medium">
                                {taskSummary.total}
                            </span>
                        </Badge>
                        <Badge
                            variant="outline"
                            className="py-4 px-3 rounded-md text-sm"
                        >
                            Menunggu{" "}
                            <span className="font-medium">
                                {taskSummary.pending}
                            </span>
                        </Badge>
                        <Badge
                            variant="outline"
                            className="py-4 px-3 rounded-md text-sm"
                        >
                            Terlambat{" "}
                            <span className="font-medium">
                                {taskSummary.due}
                            </span>
                        </Badge>
                        <Badge
                            variant="outline"
                            className="py-4 px-3 rounded-md text-sm"
                        >
                            Selesai{" "}
                            <span className="font-medium">
                                {taskSummary.completed}
                            </span>
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        {tasks.length > 0 && (
                            <TableCaption className="pb-4">
                                <Link
                                    href="/task"
                                    className="text-center hover:text-blue-500 hover:underline"
                                >
                                    Lihat selengkapnya
                                </Link>
                            </TableCaption>
                        )}
                        <TableHeader className="sticky top-0 z-10 bg-muted/50">
                            <TableRow>
                                {tableHead.map(
                                    (th: {
                                        label: string;
                                        className?: string;
                                    }) => (
                                        <TableHead
                                            key={th.label}
                                            className={cn(
                                                th.className ?? "",
                                                "uppercase",
                                            )}
                                        >
                                            {th.label}
                                        </TableHead>
                                    ),
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="**:data-[slot=table-cell]:first:w-8">
                            {tasks.length > 0 ? (
                                tasks.map((task, i) => (
                                    <TableRow key={task.id}>
                                        <TableCell>
                                            {task.title ?? "-"}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={
                                                    detailProject(
                                                        task.status.project.id,
                                                    ).url
                                                }
                                                className="text-blue-400 hover:text-blue-500 hover:underline"
                                            >
                                                {task.status.project.name ??
                                                    "-"}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {task.priority ?? "-"}
                                        </TableCell>
                                        <TableCell>
                                            {task.status.name ?? "-"}
                                        </TableCell>
                                        <TableCell>
                                            {task.due_date ?? "-"}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={tableHead.length}
                                        className="h-24 text-center"
                                    >
                                        <div className="col-span-1 md:col-span-3 text-center flex flex-col items-center justify-center gap-2 py-4">
                                            <PackageOpen />
                                            <CardDescription>
                                                Belum ada tugas.
                                            </CardDescription>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
