import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ResourceDocument from "@/pages/document/components/document-resource";
import { DocumentType } from "@/types/data/document";
import { TaskType } from "@/types/data/task";
import { Paperclip } from "lucide-react";


export function TaskDocument(
    {
        task,
        taskType,
        documents
    }: {
        task: TaskType;
        taskType: string;
        documents: DocumentType[];
    }
) {
    return (
        <ResourceDocument
            documentable_id={task.id}
            documentable_type={taskType}
            documents={documents}
            title={(
                <span className="flex gap-2 items-center">
                    <Paperclip />
                    <span>
                        Lampiran Dokumen & Assets
                    </span>
                </span>
            )}
            column={3}
        />
    );
}
