import type { InertiaLinkProps } from "@inertiajs/react";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(relativeTime);
dayjs.locale("id");

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps["href"]>): string {
    return typeof url === "string" ? url : url.url;
}

export function diffForHumans(date?: string) {
    if (!date) return "-";
    return dayjs(date).fromNow();
}

export function formatDate(date?: string) {
    if (!date) return "-";
    return dayjs(date).format("DD MMMM YYYY");
}

export function formatDateTime(date?: string) {
    if (!date) return "-";
    return dayjs(date).format("dddd, DD MMMM YYYY HH:mm:ss");
}

export function getInitials(name?: string) {
    if (!name) return "?";
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");
}

export const colSpan: Record<number, string> = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
};

export const gridCols: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
};

export const colMapping: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
};

export const gapMapping: Record<number, string> = {
    2: "gap-2",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
};
