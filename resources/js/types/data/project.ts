import { UserWithRole } from "./user";

export type CardData = {
    total_project: number;
    running_project: number;
    at_risk_project: number;
    completed_project: number;
};

export type ProjectGridType = {
    id: number;
    name: string;
    description?: string;
    priority: string;
    pic: UserWithRole;
    teams?: UserWithRole[];
    start_date: string;
};
