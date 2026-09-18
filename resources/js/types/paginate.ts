export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface LaravelPagination<T> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: PaginationLink[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
}

export interface LinkPagination {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

export interface MetaPagination {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}
