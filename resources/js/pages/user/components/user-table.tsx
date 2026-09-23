import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { UserTableType } from "@/types/data/user";
import { UseModalReturn } from "@/types/modal";
import { TableHeadType } from "@/types/table";
import { Link } from "@inertiajs/react";
import {
    CircleCheck,
    CircleX,
    FileText,
    MoreVertical,
    SquarePen,
    Trash2,
} from "lucide-react";

export function UserTable({
    data,
    modal,
    tableHead,
}: {
    data: UserTableType[];
    modal: UseModalReturn;
    tableHead: TableHeadType[];
}) {
    return (
        <Card className="p-0">
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
                            data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name ?? "-"}</TableCell>
                                    <TableCell>{user.email ?? "-"}</TableCell>
                                    <TableCell>{user.role ?? "-"}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {user.is_active ? (
                                                <>
                                                    <CircleCheck /> Aktif
                                                </>
                                            ) : (
                                                <>
                                                    <CircleX />
                                                    Nonaktif
                                                </>
                                            )}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.last_login_at ?? "-"}
                                    </TableCell>
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
                                                {can("user.edit") && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            modal.openEdit(user)
                                                        }
                                                    >
                                                        <SquarePen />
                                                        Edit
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={
                                                            "/user/" + user.id
                                                        }
                                                    >
                                                        <FileText />
                                                        Detail
                                                    </Link>
                                                </DropdownMenuItem>
                                                {can("user.delete") && (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                modal.openDelete(
                                                                    user.id,
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
