import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CardData } from "@/types/data/user";
import { Lock, ShieldCheck, UserRoundCheck, UsersRound } from "lucide-react";

export function UserSectionCard({ cardData }: { cardData: CardData }) {
    const cards = [
        {
            label: "TOTAL AKUN",
            value: cardData.total_account,
            description: "Total seluruh akun",
            icon: <UsersRound />,
        },
        {
            label: "PENGGUNA AKTIF",
            value: cardData.total_active,
            description: "Total akun aktif",
            icon: <UserRoundCheck />,
        },
        {
            label: "NONAKTIF",
            value: cardData.total_nonactive,
            description: "Total akun tidak aktif",
            icon: <Lock />,
        },
        {
            label: "ADMIN",
            value: cardData.total_admin,
            description: "Total admin",
            icon: <ShieldCheck />,
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
