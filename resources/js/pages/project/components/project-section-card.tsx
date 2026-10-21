import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CardData } from "@/types/data/project";
import { CircleAlert, FolderCheck, FolderOpen, Zap } from "lucide-react";

export function ProjectSectionCard({ cardData }: { cardData: CardData }) {
    const cards = [
        {
            label: "TOTAL PROYEK",
            value: cardData.total_total ?? 0,
            description: "Total seluruh proyek",
            icon: <FolderOpen />,
        },
        {
            label: "SEDANG BERJALAN",
            value: cardData.total_running ?? 0,
            description: "Total proyek yang sedang berjalan",
            icon: <Zap />,
        },
        {
            label: "PROYEK TERLAMBAT",
            value: cardData.total_overdue ?? 0,
            description: "Total proyek yang terlambat",
            icon: <CircleAlert />,
        },
        {
            label: "PROYEK SELESAI",
            value: cardData.total_completed ?? 0,
            description: "Total proyek yang selesai",
            icon: <FolderCheck />,
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
