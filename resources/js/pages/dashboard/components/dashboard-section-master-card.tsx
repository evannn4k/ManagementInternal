import { CountUp } from "@/components/count-up";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CardMasterData } from "@/types/data/dashboard";
import {
    CircleAlert,
    CircleCheck,
    ClipboardCheck,
    FolderCheck,
    FolderClock,
    FolderOpen,
    UserRoundCheck,
    Zap,
} from "lucide-react";

export function DashboardSectionMasterCard({
    cardMasterData,
}: {
    cardMasterData: CardMasterData;
}) {
    const cards = [
        {
            label: "USER AKTIF",
            value: cardMasterData.total_active_user ?? 0,
            icon: <UserRoundCheck />,
        },
        {
            label: "TUGAS BERJALAN",
            value: cardMasterData.total_running_task ?? 0,
            icon: <ClipboardCheck />,
        },
        {
            label: "PROYEK AKTIF",
            value: cardMasterData.total_running_project ?? 0,
            icon: <FolderCheck />,
        },
        {
            label: "PROYEK TERLAMBAT",
            value: cardMasterData.total_due_project ?? 0,
            icon: <FolderClock />,
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
