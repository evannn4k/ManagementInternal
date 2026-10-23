import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CardDataType } from "@/types/data/activity";
import { Code, TrendingUp } from "lucide-react";

export function ActivitySectionCard({ cardData }: { cardData?: CardDataType }) {
    const cards = [
        {
            label: "TOTAL EVENT TERCATAT",
            value: cardData?.total_activity ?? 0,
            description: "Seluruh aktivitas yang tercatat",
            icon: <Code className="size-4" />,
        },
        {
            label: "MUTASI CREATE",
            value: cardData?.total_create ?? 0,
            unit: "record baru",
            description: "Total seluruh aktivitas create",
        },
        {
            label: "MUTASI UPDATE",
            value: cardData?.total_update ?? 0,
            unit: "perubahan",
            description: "Total seluruh aktivitas update",
        },
        {
            label: "MUTASI DELETE",
            value: cardData?.total_delete ?? 0,
            unit: "terhapus",
            description: "Total seluruh aktivitas delete",
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
                            <div className="flex items-baseline gap-2">
                                <CardTitle className="text-3xl font-bold tracking-tight">
                                    {card.value.toLocaleString()}
                                </CardTitle>
                                <span className="text-xs font-normal">
                                    {card.unit}
                                </span>
                            </div>
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
