export type UserTableType = {
    id: number;
    name: string;
    email: string;
    role: string | null;
    is_active: boolean;
    last_login_at: string | null;
};
