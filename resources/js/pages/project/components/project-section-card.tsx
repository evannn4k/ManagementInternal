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
            value: cardData.total_project ?? 0,
            description: "Total seluruh proyek",
            icon: <FolderOpen />,
        },
        {
            label: "SEDANG BERJALAN",
            value: cardData.running_project ?? 0,
            description: "Total proyek yang sedang berjalan",
            icon: <Zap />,
        },
        {
            label: "PERLU PERHATIAN",
            value: cardData.at_risk_project ?? 0,
            description: "Total proyek yang perlu perhatian",
            icon: <CircleAlert />,
        },
        {
            label: "PROYEK SELESAI",
            value: cardData.completed_project ?? 0,
            description: "Total proyek yang selesai",
            icon: <FolderCheck />,
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
