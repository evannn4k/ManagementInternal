export type CardData = {
    total_pending: number;
    total_running: number;
    total_overdue: number;
    total_completed: number;
};

export type StatusDistributionType = {
    pending: string;
    running: string;
    completed: string;
    canceled: string;
};

export type AssignedDistributionType = {
    name: string;
    tasks_count: number;
}[];
