import { Link } from "@inertiajs/react";
import {
    BookOpen,
    ClipboardCheck,
    FolderGit2,
    FolderOpen,
    LayoutGrid,
    UsersRound,
    ShieldCheck,
    Settings,
} from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboard } from "@/routes";
import type { NavItem } from "@/types";
import { index as userIndex } from "@/routes/user";
import { index as roleIndex } from "@/routes/role";

const navigationNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: "Project",
        href: dashboard(),
        icon: FolderOpen,
    },
    {
        title: "Task",
        href: dashboard(),
        icon: ClipboardCheck,
    },
];

const administrationNavItems: NavItem[] = [
    {
        title: "User Management",
        href: userIndex(),
        icon: UsersRound,
        permission: "user.view",
    },
    {
        title: "Role & Permission",
        href: roleIndex(),
        icon: ShieldCheck,
        permission: "role.manage",
    },
    {
        title: "Setting",
        href: dashboard(),
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: "Repository",
        href: "https://github.com/laravel/react-starter-kit",
        icon: FolderGit2,
    },
    {
        title: "Documentation",
        href: "https://laravel.com/docs/starter-kits#react",
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain label="Navigation" items={navigationNavItems} />
                <NavMain
                    label="Administration"
                    items={administrationNavItems}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
