export interface UseModalReturn {
    isOpen: (type: string) => boolean;
    data: any | null;
    openModal: (type: string, data?: any | null) => void;
    closeModal: () => void;
    openCreate: () => void;
    openEdit: (data: any) => void;
    openDelete: (data: any) => void;
}
