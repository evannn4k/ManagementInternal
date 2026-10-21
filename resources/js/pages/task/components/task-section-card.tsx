import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CardDataType } from "@/types/data/task";
import { CircleAlert, Clock, FolderOpen, Zap } from "lucide-react";

export function TaskSectionCard({ cardData }: { cardData: CardDataType }) {
    const cards = [
        {
            label: "TOTAL TUGAS",
            value: cardData.total_task ?? 0,
            description: "Total seluruh tugas",
            icon: <FolderOpen />,
        },
        {
            label: "SEDANG BERJALAN",
            value: cardData.total_running ?? 0,
            description: "Total proyek yang sedang berjalan",
            icon: <Zap />,
        },
        {
            label: "TUGAS TERLAMBAT",
            value: cardData.total_overdue ?? 0,
            description: "Total proyek terlambat",
            icon: <CircleAlert />,
        },
        {
            label: "TENGGAT MINGGU INI",
            value: cardData.this_week ?? 0,
            description: "Total batas tenggat minggu depan",
            icon: <Clock />,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <Card key={index} className="bg-muted/50">
                    <CardHeader className="h-full">
                        <div className="flex flex-col gap-2 h-full">
                            <div className="flex items-center justify-between">
                                <CardDescription className="font-semibold tracking-wider text-xs">
                                    {card.label}
                                </CardDescription>
                                <div>{card.icon}</div>
                            </div>
                            <CardTitle className="text-3xl font-bold">
                                {card.value.toLocaleString()}
                            </CardTitle>
                            <CardDescription className="text-xs mt-auto">
                                {card.description}
                            </CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
