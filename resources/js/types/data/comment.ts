import { UserWithRole } from "./user";

export interface CommentType {
    id: string;
    user_id?: number | null;
    commentable_type?: string;
    commentable_id?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;

    is_own?: boolean;
    user?: UserWithRole | null;
    commentable?: any;
}
