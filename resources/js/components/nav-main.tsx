import { Link } from "@inertiajs/react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCurrentUrl } from "@/hooks/use-current-url";
import type { NavItem } from "@/types";
import { can } from "@/lib/middleware";

export function NavMain({ items, label }: { items: NavItem[]; label: string }) {
    const { isCurrentUrl } = useCurrentUrl();

    const havePermission = (permission: string | string[]) => {
        if (typeof permission == "string") {
            return can(permission);
        } else if (Array.isArray(permission)) {
            return permission.some((p) => can(p));
        }

        return false;
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item: NavItem) => {
                    if (item.permission && !havePermission(item.permission))
                        return;

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(item.href)}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
