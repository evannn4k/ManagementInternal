import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { UserTableType } from "@/types/data/user";
import { TableHeadType } from "@/types/table";
import { CircleCheck, CircleX } from "lucide-react";

export function UserTable({
    data,
    tableHead,
}: {
    data: UserTableType[];
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
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
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
                                    <TableCell>{user.last_login_at}</TableCell>
                                    <TableCell>test</TableCell>
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
