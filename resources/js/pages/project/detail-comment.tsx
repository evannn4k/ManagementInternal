import { ProjectType } from "@/types/data/project";
import ProjectDetailLayout from "./project-detail-layout";
import { CommentType } from "@/types/data/comment";
import { CommentResource } from "../comment/components/comment-resource";

export default function ProjectDetailCommentPage({
    project,
    projectType,
    comments,
}: {
    project: ProjectType;
    projectType: string;
    comments: { data: CommentType[] };
}) {
    return (
        <CommentResource
            commentable_id={project.id}
            commentable_type={projectType}
            comments={comments.data}
        />
    );
}

ProjectDetailCommentPage.layout = (page: any) => {
    const project = page.project ?? page.props.project;
    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};
