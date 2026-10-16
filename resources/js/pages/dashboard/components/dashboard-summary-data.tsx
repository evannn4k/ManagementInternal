import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import {
    AssignedDistributionType,
    StatusDistributionType,
} from "@/types/data/dashboard";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DashboardTaskPagination } from "./dashboard-task-pagination";
import { LaravelPagination } from "@/types/paginate";

export default function DashboardSummaryData({
    statusDistribution,
    assignedDistribution,
    overdueTasks,
}: {
    statusDistribution?: StatusDistributionType;
    assignedDistribution?: AssignedDistributionType;
    overdueTasks?: LaravelPagination<{ title: string; due_date: string }>;
}) {
    console.log(overdueTasks);

    const statusChartData = [
        {
            status: "pending",
            total: statusDistribution ? statusDistribution.pending : 0,
            fill: "var(--chart-1)",
        },
        {
            status: "running",
            total: statusDistribution ? statusDistribution.running : 0,
            fill: "var(--chart-2)",
        },
        {
            status: "canceled",
            total: statusDistribution ? statusDistribution.canceled : 0,
            fill: "var(--chart-3)",
        },
        {
            status: "completed",
            total: statusDistribution ? statusDistribution.completed : 0,
            fill: "var(--chart-4)",
        },
    ];

    const statusChartConfig = {
        pending: {
            label: "Pending",
            color: "var(--chart-1)",
        },
        running: {
            label: "Running",
            color: "var(--chart-2)",
        },
        canceled: {
            label: "Canceled",
            color: "var(--chart-3)",
        },
        completed: {
            label: "Completed",
            color: "var(--chart-4)",
        },
    } satisfies ChartConfig;

    const assignedChartData = assignedDistribution?.map((assigned, i) => ({
        assigned: assigned.name,
        total: assigned.tasks_count,
        fill: `var(--chart-${i + 1})`,
    }));

    const assignedChartConfig = Object.fromEntries(
        assignedChartData?.map((assigned) => [
            assigned.assigned,
            {
                label: assigned.assigned,
                color: assigned.fill,
            },
        ]) ?? [],
    ) satisfies ChartConfig;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="flex flex-col bg-muted/50">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Status Tugas</CardTitle>
                    <CardDescription>
                        Distribusi tugas per status
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={statusChartConfig}
                        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={statusChartData}
                                dataKey="total"
                                label
                                nameKey="status"
                            />
                            <ChartLegend
                                content={
                                    <ChartLegendContent nameKey="status" />
                                }
                                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="flex flex-col bg-muted/50">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Top 5 User</CardTitle>
                    <CardDescription>
                        Lima teratas total distribusi tugas user
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={assignedChartConfig}
                        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={assignedChartData}
                                dataKey="total"
                                label
                                nameKey="assigned"
                            />
                            <ChartLegend
                                content={
                                    <ChartLegendContent nameKey="assigned" />
                                }
                                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="flex flex-col bg-muted/50">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Tugas Terlambat</CardTitle>
                    <CardDescription>
                        Daftar tugas terlambat teratas
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <Table className="text-xs">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tugas</TableHead>
                                <TableHead className="text-end">
                                    Waktu Tenggat
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {overdueTasks?.data.map((task) => (
                                <TableRow key={task.title + task.due_date}>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell className="text-end">
                                        {task.due_date}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {overdueTasks && overdueTasks.data.length > 0 && (
                        <DashboardTaskPagination
                            links={overdueTasks.links}
                            meta={overdueTasks.meta}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
