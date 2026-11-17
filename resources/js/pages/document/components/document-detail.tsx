import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    FileText,
    Download,
    ExternalLink,
    Calendar,
    User,
    HardDrive,
    FolderOpen,
    Hash,
} from "lucide-react";
import { UseModalReturn } from "@/types/modal";
import { formatDate } from "@/lib/utils";
import { DocumentType } from "@/types/data/document";

export function DocumentDetailDialog({ modal, handleDownloadDocument }: {
    modal: UseModalReturn;
    handleDownloadDocument: (document: DocumentType) => void;
}) {
    return (
        <Dialog
            open={modal.isOpen("detail")}
            onOpenChange={() => {
                modal.closeModal();
            }}
        >
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                            <DialogTitle className="text-base font-semibold">
                                {modal.data?.file_name ?? "-"}
                            </DialogTitle>
                            <DialogDescription className="flex items-center gap-2 text-xs">
                                <Badge variant="secondary" className="font-mono text-[11px]">
                                    {modal.data?.mime_type ?? "-"}
                                </Badge>
                                <span>•</span>
                                {(modal.data?.file_size / (1024 * 1024)).toFixed(1)} MB
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Separator />

                <div className="grid gap-4 py-2 text-sm">
                    <div className="grid grid-cols-3 items-center gap-2">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <Hash className="h-4 w-4" /> ID
                        </span>
                        <span className="col-span-2 font-mono text-xs">{modal.data?.id ?? "-"}</span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="h-4 w-4" /> Nama File
                        </span>
                        <span className="col-span-2 font-medium">{modal.data?.file_name ?? "-"}</span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <FolderOpen className="h-4 w-4" /> Path File
                        </span>
                        <span className="col-span-2 rounded bg-muted px-2 py-1 font-mono text-xs">
                            {modal.data?.file_path ?? "-"}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <HardDrive className="h-4 w-4" /> Ukuran
                        </span>
                        <span className="col-span-2">
                            {(modal.data?.file_size / (1024 * 1024)).toFixed(1)} MB
                        </span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" /> Diunggah Oleh
                        </span>
                        <span className="col-span-2">{modal.data?.uploader?.name ?? "-"}</span>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-3 items-center gap-2">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" /> Dibuat Pada
                        </span>
                        <span className="col-span-2 text-xs">{modal.data?.created_at ? formatDate(modal.data?.created_at) : ""}</span>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">
                            Batal
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={(e) => {
                            modal.closeModal()
                            handleDownloadDocument(modal.data)
                        }}>
                        <Download className="mr-2 h-4 w-4" />
                        Unduh
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}