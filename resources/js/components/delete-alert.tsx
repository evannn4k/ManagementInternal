import { Trash2Icon } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UseModalReturn } from "@/types/modal";

export function DeleteAlert({
    modal,
    title,
    description,
    handleDelete,
}: {
    modal: UseModalReturn;
    title: string;
    description: string;
    handleDelete: (id: number) => void;
}) {
    return (
        <AlertDialog
            open={modal.isOpen("delete")}
            onOpenChange={() => modal.closeModal()}
        >
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete(modal.data)}
                        variant="destructive"
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
