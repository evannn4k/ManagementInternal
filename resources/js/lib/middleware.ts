import { usePage } from "@inertiajs/react";

export function can(permission: string | string[]): boolean {
    const { auth } = usePage().props;

    const userPermission = auth.user?.permissions ?? [];

    if (Array.isArray(permission)) {
        return permission.some((p) => userPermission?.includes(p)) ?? false;
    }

    return userPermission.includes(permission) ?? false;
}
