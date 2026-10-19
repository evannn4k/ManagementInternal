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
            {cards.map((card) => (
                <Card key={card.label} className="bg-muted/50">
                    <CardHeader className="h-full">
                        <div className="flex flex-col gap-2 h-full">
                            <CardDescription>{card.label}</CardDescription>
                            <CardTitle className="text-2xl">
                                {card.value}
                            </CardTitle>
                            <CardDescription className="mt-auto">
                                {card.description}
                            </CardDescription>
                        </div>
                        <CardAction>{card.icon}</CardAction>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
