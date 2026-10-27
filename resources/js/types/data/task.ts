import { ProjectStatusType } from "./project";
import { UserWithRole } from "./user";

export type SubTasksType = {
    id: string;
    task_id: string;
    name: string;
    is_completed: boolean;
}

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
    sub_tasks: SubTasksType[];
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