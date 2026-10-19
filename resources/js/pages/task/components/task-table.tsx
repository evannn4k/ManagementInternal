import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { can } from "@/lib/middleware";
import { cn } from "@/lib/utils";
import { UseModalReturn } from "@/types/modal";
import { TableHeadType } from "@/types/table";
import { Link } from "@inertiajs/react";
import {
    FileText,
    MoreVertical,
    PackageOpen,
    SquarePen,
    Trash2,
} from "lucide-react";
import { detail as detailTask } from "@/routes/task";
import { detail as detailProject } from "@/routes/project";

export function TaskTable({
    data,
    modal,
    tableHead,
}: {
    data: any[];
    modal: UseModalReturn;
    tableHead: TableHeadType[];
}) {
    return (
        <CardContent className="p-0">
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted/50">
                    <TableRow>
                        {tableHead.map((th) => (
                            <TableHead
                                key={th.label}
                                className={cn(th.className, "uppercase")}
                            >
                                {th.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8">
                    {data.length > 0 ? (
                        data.map((task, i) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.title ?? "-"}</TableCell>
                                <TableCell>
                                    <Link
                                        href={
                                            detailProject(
                                                task.status.project.id,
                                            ).url
                                        }
                                        className="text-blue-400 hover:text-blue-500 hover:underline"
                                    >
                                        {task.status.project.name ?? "-"}
                                    </Link>
                                </TableCell>
                                <TableCell>{task.priority ?? "-"}</TableCell>
                                <TableCell>{task.status.name ?? "-"}</TableCell>
                                <TableCell>{task.due_date ?? "-"}</TableCell>
                                <TableCell className="text-right">
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
                                            {can("task.edit") && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        modal.openEdit(task)
                                                    }
                                                >
                                                    <SquarePen />
                                                    Edit
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={
                                                        detailTask(task.id).url
                                                    }
                                                >
                                                    <FileText />
                                                    Detail
                                                </Link>
                                            </DropdownMenuItem>
                                            {can("task.delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            modal.openDelete(
                                                                task.id,
                                                            )
                                                        }
                                                        variant="destructive"
                                                    >
                                                        <Trash2 />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
    );
}
