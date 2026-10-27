import { UserWithRole } from "./user";

export type ActivityType = {
    id: string;
    user_id: number | null;
    user: UserWithRole;
    subject?: {
        id?: number | string;
        type?: string;
        name?: string;
        is_deleted: boolean;
    };
    type: "create" | "update" | "delete" | string | null;
    old_data: Record<string, any>[] | null;
    new_data: Record<string, any>[] | null;
    ip_address: string | null;
    created_at: string;
    updated_at: string;
};

export type CardDataType = {
    total_activity: number;
    total_create: number;
    total_update: number;
    total_delete: number;
};
