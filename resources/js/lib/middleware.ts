import { usePage } from "@inertiajs/react";

export function can(permission: string): boolean {
    const { auth } = usePage().props;
    return auth.user.permissions?.includes(permission) ?? false;
}
