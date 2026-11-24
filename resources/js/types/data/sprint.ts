interface SprintType {
    id: string;
    project_id: string;
    number: number;
    name: string;
    description?: string;
    status: string;
    start_date?: string;
    end_date?: string;
    tasks_done?: number;
    tasks_total?: number;
}
