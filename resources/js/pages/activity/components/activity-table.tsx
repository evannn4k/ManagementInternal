import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn, diffForHumans, formatDate, formatDateTime } from "@/lib/utils";
import { TableHeadType } from "@/types/table";
import {
    ActivityIcon,
    ChevronDown,
    ChevronUp,
    CircleMinus,
    CirclePlus,
} from "lucide-react";
import { ActivityType } from "@/types/data/activity";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    CodeBlock,
    CodeBlockContent,
    CodeBlockHeader,
    CodeBlockTitle,
} from "@/components/ui/code-block";
import { detail as userDetail } from "@/routes/user";
import { detail as projectDetail } from "@/routes/project";
import { detail as taskDetail } from "@/routes/task";

export function ActivityTable({
    data,
    tableHead,
    tableCaption,
}: {
    data: ActivityType[];
    tableHead: TableHeadType[];
    tableCaption?: any;
}) {
    const [open, setOpen] = useState<string | null>();

    const handleChangeOpen = (id: string) => {
        setOpen((prev) => (prev == id ? null : id));
    };

    const getUrl = (type?: string, id?: string | number) => {
        const typeModel = type ? type.toLowerCase() : "";

        return typeModel === "task"
            ? taskDetail(id as string).url
            : typeModel === "project"
              ? projectDetail(id as string).url
              : typeModel === "user"
                ? userDetail(id as number).url
                : "#";
    };

    return (
        <Card className="p-0">
            <CardContent className="p-0">
                <Table>
                    {tableCaption && (
                        <TableCaption>{tableCaption}</TableCaption>
                    )}
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
                            data.map((activity) => {
                                const isOpen = open === activity.id;

                                return (
                                    <React.Fragment key={activity.id}>
                                        <TableRow>
                                            <TableCell>
                                                <Link
                                                    href={
                                                        activity.user_id
                                                            ? userDetail(
                                                                  activity.user_id,
                                                              ).url
                                                            : "#"
                                                    }
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {activity.user.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {activity.type}
                                            </TableCell>
                                            <TableCell>
                                                {activity.subject?.name ? (
                                                    <Link
                                                        href={getUrl(
                                                            activity.subject
                                                                .type,
                                                            activity.subject.id,
                                                        )}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {activity.subject?.name}
                                                    </Link>
                                                ) : (
                                                    activity.subject?.name
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {activity.subject?.type ?? "-"}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(
                                                    activity.created_at,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {activity.ip_address}
                                            </TableCell>
                                            <TableCell className="text-end">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleChangeOpen(
                                                            activity.id,
                                                        )
                                                    }
                                                >
                                                    {isOpen ? (
                                                        <ChevronUp />
                                                    ) : (
                                                        <ChevronDown />
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                        {isOpen && (
                                            <TableRow className="bg-muted/50">
                                                <TableCell
                                                    colSpan={tableHead.length}
                                                    className="p-4"
                                                >
                                                    <div className="flex flex-col gap-4">
                                                        <div className="w-full flex items-center gap-4 justify-between capitalize">
                                                            <CardDescription>
                                                                {formatDateTime(
                                                                    activity.created_at,
                                                                )}
                                                            </CardDescription>
                                                            <CardDescription>
                                                                {diffForHumans(
                                                                    activity.created_at,
                                                                )}
                                                            </CardDescription>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <CodeBlock>
                                                                <CodeBlockHeader>
                                                                    <CodeBlockTitle className="text-red-600 dark:text-red-500">
                                                                        <CircleMinus />
                                                                        Data
                                                                        Lama
                                                                    </CodeBlockTitle>
                                                                </CodeBlockHeader>
                                                                <CodeBlockContent>
                                                                    <pre className="pre-wrap break-all">
                                                                        {JSON.stringify(
                                                                            activity.old_data,
                                                                            null,
                                                                            2,
                                                                        )}
                                                                    </pre>
                                                                </CodeBlockContent>
                                                            </CodeBlock>
                                                            <CodeBlock>
                                                                <CodeBlockHeader>
                                                                    <CodeBlockTitle className="text-green-600 dark:text-green-500">
                                                                        <CirclePlus />
                                                                        Data
                                                                        Baru
                                                                    </CodeBlockTitle>
                                                                </CodeBlockHeader>
                                                                <CodeBlockContent>
                                                                    <pre className="pre-wrap break-all">
                                                                        {JSON.stringify(
                                                                            activity.new_data,
                                                                            null,
                                                                            2,
                                                                        )}
                                                                    </pre>
                                                                </CodeBlockContent>
                                                            </CodeBlock>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={tableHead.length}
                                    className="h-24 text-center"
                                >
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon">
                                                <ActivityIcon />
                                            </EmptyMedia>
                                            <EmptyTitle>
                                                Belum ada aktivitas
                                            </EmptyTitle>
                                        </EmptyHeader>
                                    </Empty>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
