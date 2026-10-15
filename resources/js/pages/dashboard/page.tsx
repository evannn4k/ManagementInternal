import { Head, usePage } from "@inertiajs/react";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { dashboard } from "@/routes";
import { User } from "lucide-react";
import { DashboardSectionCard } from "./components/dashboard-section-card";
import { Card, CardContent } from "@/components/ui/card";
import { CardData } from "@/types/data/dashboard";
import { DashboardSectionTask } from "./components/dashboard-section-task";
import { TaskType } from "@/types/data/task";

export default function Dashboard({ cardData, overdue, thisWeek, pending }: { cardData: CardData, overdue: TaskType[], thisWeek: TaskType[] , pending: TaskType[]}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">
                <Card className="bg-muted/50">
                    <CardContent>
                        <header className="w-full md:max-w-3xl flex justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
                            <div className="flex flex-col gap-2">
                                <p className="capitalize flex items-center gap-2">
                                    <span className="font-semibold flex items-center gap-2">
                                        <User /> {auth.user.role}
                                    </span>
                                    -
                                    <span>
                                        {auth.user.position
                                            ? auth.user.position
                                            : "Tanpa Posisi"}
                                    </span>
                                </p>
                                <h1 className="font-semibold text-2xl md:text-3xl">
                                    Selamat datang kembali, {auth.user.name}
                                </h1>
                                <p className="teks-xs">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Impedit dolorum rerum
                                    exercitationem delectus sed perspiciatis.
                                </p>
                            </div>
                        </header>
                    </CardContent>
                </Card>
                <DashboardSectionCard cardData={cardData} />
                <DashboardSectionTask overdue={overdue} thisWeek={thisWeek} pending={pending}/>
            </div>
        </> 
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboard(),
        },
    ],
};
