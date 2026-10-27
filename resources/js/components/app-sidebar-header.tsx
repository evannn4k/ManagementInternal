import { Breadcrumbs } from "@/components/breadcrumbs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { BreadcrumbItem as BreadcrumbItemType } from "@/types";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, router, usePage } from "@inertiajs/react";
import { FaTelegramPlane } from "react-icons/fa";
import ConnectTelegram from "@/actions/App/Http/Controllers/Telegram/ConnectTelegramController";

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props;

    const handleTelegramConnect = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(ConnectTelegram().url);
    };

    return (
        <header className="border-sidebar-border/50 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {!auth.user.telegram_chat_id && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <form onSubmit={handleTelegramConnect}>
                            <Button type="submit" size="icon">
                                <FaTelegramPlane />
                            </Button>
                        </form>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Dapatkan notifikasi Telegram</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </header>
    );
}
