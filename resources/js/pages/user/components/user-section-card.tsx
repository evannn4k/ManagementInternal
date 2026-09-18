import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Bell, Lock, UserRoundCheck, UsersRound } from "lucide-react";

export function UserSectionCard() {
    const cards = [
        {
            label: "TOTAL AKUN",
            value: 48,
            description: "Total seluruh akun",
            icon: <UsersRound />,
        },
        {
            label: "PENGGUNA AKTIF",
            value: 48,
            description: "Total seluruh akun",
            icon: <UserRoundCheck />,
        },
        {
            label: "MENUNGGU AKTIVASI",
            value: 48,
            description: "Total seluruh akun",
            icon: <Bell />,
        },
        {
            label: "NONAKTIF",
            value: 48,
            description: "Total seluruh akun",
            icon: <Lock />,
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
