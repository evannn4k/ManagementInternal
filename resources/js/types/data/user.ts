export type UserTableType = {
    id: number;
    name: string;
    email: string;
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
