import { TaskType } from "./task";
import { UserWithRole } from "./user";

export type CardData = {
    total_project: number;
    running_project: number;
    overdue_project: number;
    completed_project: number;
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
};

export type ProjectStatusType = {
    id: string;
    project_id: string;
    name: string;
    position: number;
    project: ProjectType;
    type: string;
    tasks: TaskType[]
};
