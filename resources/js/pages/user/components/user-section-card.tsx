import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";

export function UserSectionCard() {
    const cards = [
        { label: "TOTAL AKUN", value: 48, description: "Total seluruh akun" },
        { label: "TOTAL AKUN", value: 48, description: "Total seluruh akun" },
        { label: "TOTAL AKUN", value: 48, description: "Total seluruh akun" },
        { label: "TOTAL AKUN", value: 48, description: "Total seluruh akun" },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <Card key={i} className="p-0">
                    <CardContent className="p-4 m-0">
                        <CardDescription>{card.label}</CardDescription>
                        <CardTitle>{card.value}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
