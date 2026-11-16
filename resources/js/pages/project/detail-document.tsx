import { ProjectType } from "@/types/data/project";
import ResourceDocument from "../document/components/document-resource";
import ProjectDetailLayout from "./project-detail-layout";
import { DocumentType } from "@/types/data/document";

export default function ProjectDetailDocumentPage(
    {
        project,
        projectType,
        documents
    }: {
        project: ProjectType;
        projectType: string;
        documents: DocumentType[];
    }) {
    return (
        <ResourceDocument
            documentableId={project.id}
            documentableType={projectType}
            documents={documents}
            title="Dokumen Project"
        />
    );
}

ProjectDetailDocumentPage.layout = (page: any) => {
    const project = page.project ?? page.props.project;
    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};