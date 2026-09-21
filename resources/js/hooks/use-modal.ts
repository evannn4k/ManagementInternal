import { UseModalReturn } from "@/types/modal";
import { useState } from "react";

export function useModal(): UseModalReturn {
    const [modal, setModal] = useState<string | null>();
    const [data, setData] = useState<any | null>();

    const openModal = (type: string, data: any | null = null): void => {
        setModal(type);
        setData(data ?? null);
    };

    const closeModal = (): void => {
        setModal(null);
        setData(null);
    };

    return {
        isOpen: (type: string) => modal == type,
        data,
        openModal,
        closeModal,
        openCreate: () => {
            openModal("create");
        },
        openEdit: (data: any) => {
            openModal("edit", data);
        },
        openDelete: (data: any) => {
            openModal("delete", data);
        },
    };
}
