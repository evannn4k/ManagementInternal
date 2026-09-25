export type UserTableType = {
    id: number;
    name: string;
    email: string;
    position?: string;
    role: string | null;
    is_active: boolean;
    last_login_at: string | null;
};

export type CardData = {
    total_account: number;
    total_active: number;
    total_nonactive: number;
    total_admin: number;
};

export type Roles = { id: number; name: string };

export type UserWithRole = {
    id: number;
    name: string;
    roles?: Roles[];
    position?: string;
};
