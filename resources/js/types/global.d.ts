import type { Auth } from "@/types/auth";

declare module "react" {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

interface Flash {
    success: string | null;
    error: string | null;
    timestamp: number;
}

declare module "@inertiajs/core" {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
    interface PageProps extends InertiaPageProps {
        flash: Flash;
    }
}
