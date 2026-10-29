import { TaskType } from "./task";
import { UserWithRole } from "./user";

export type CardData = {
    total_total: number;
    total_running: number;
    total_overdue: number;
    total_completed: number;
};

export type ProjectGridType = {
    id: string;
    name: string;
    description?: string;
    priority: string;
    createdBy: UserWithRole;
    pic: UserWithRole;
    teams?: UserWithRole[];
    start_date: string;
    status: string;
    statuses: ProjectStatusType[];
    total_task?: number;
};

export type ProjectType = {
    id: string;
    name: string;
    description?: string;
    start_date: string;
    end_date: string;
    priority: string;
    repo_url: string;
    branch: string;
    status: string;
    createdBy: UserWithRole;
    pic: UserWithRole;
    teams?: UserWithRole[];
    statuses: ProjectStatusType[];
    total_task?: number;
};

export type ProjectStatusType = {
    id: string;
    project_id: string;
    name: string;
    position: number;
    project: ProjectType;
    type: string;
    tasks: TaskType[];
    total_task?: number;
};
