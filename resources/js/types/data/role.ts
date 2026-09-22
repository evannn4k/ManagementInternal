export interface Role {
    id: number;
    name: string;
    guard_name?: string;
    description?: string;
    is_system?: boolean;
    created_at?: number;
    updated_at?: number;
}

export interface Permission {
    id: number;
    name: string;
    description?: string;
    created_at?: number;
    updated_at?: number;
}
