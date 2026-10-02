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
