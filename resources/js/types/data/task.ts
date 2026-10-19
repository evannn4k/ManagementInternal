import { ProjectStatusType } from "./project";
import { UserWithRole } from "./user";

export type TaskType = {
    id: string;
    status_id: string;
    title: string;
    description: string;
    priority: string;
    due_date: string;
    label: [];
    file: [];
    status: ProjectStatusType;
    assigned: UserWithRole[];
};

export type CardDataType = {
    total_running: number;
    total_overdue: number;
    this_week: number;
    total_task: number;
};

export type TaskSummaryType = {
    total: number,
    pending: number,
    due: number,
    completed: number,
}