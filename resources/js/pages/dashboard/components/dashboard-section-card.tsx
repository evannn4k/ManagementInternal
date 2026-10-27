import { CountUp } from "@/components/count-up";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CardData } from "@/types/data/dashboard";
import { CircleAlert, CircleCheck, FolderOpen, Zap } from "lucide-react";

export function DashboardSectionCard({ cardData }: { cardData: CardData }) {
    const cards = [
        {
            label: "TUGAS MENUNGGU",
            value: cardData.total_pending ?? 0,
            icon: <FolderOpen />,
        },
        {
            label: "TUGAS DIKERJAKAN",
            value: cardData.total_running ?? 0,
            icon: <Zap />,
        },
        {
            label: "TERLAMBAT",
            value: cardData.total_overdue ?? 0,
            icon: <CircleAlert />,
        },
        {
            label: "SELESAI",
            value: cardData.total_completed ?? 0,
            icon: <CircleCheck />,
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
                                <CountUp end={card.value} duration={2} />
                            </CardTitle>
                        </div>
                        <CardAction>{card.icon}</CardAction>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
