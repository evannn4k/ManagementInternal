import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Message,
    MessageAvatar,
    MessageContent,
    MessageHeader,
} from "@/components/ui/message";
import { MessagesSquare, Send, UserRound } from "lucide-react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import { CommentType } from "@/types/data/comment";
import { Empty, EmptyHeader, EmptyDescription } from "@/components/ui/empty";
import { Form, useForm, usePage } from "@inertiajs/react";
import { create } from "@/routes/comment";
import { Spinner } from "@/components/ui/spinner";
import { getInitials } from "@/lib/utils";
import { can } from "@/lib/middleware";

interface ResourceCommentProps {
    comments: CommentType[];
    commentable_id: string | number;
    commentable_type: string;
}

interface CommentPayload {
    content: string;
    commentable_id: string | number;
    commentable_type: string;
}

export function CommentResource({
    comments,
    commentable_id,
    commentable_type,
}: ResourceCommentProps) {
    const initialData = {
        content: "",
        commentable_id: commentable_id,
        commentable_type: commentable_type,
    };

    const { auth } = usePage().props;

    const { processing, data, setData, errors, post, reset } =
        useForm<CommentPayload>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(create().url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessagesSquare />
                    Komentar
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col gap-6 pb-4 md:pb-6">
                    {comments?.length > 0 ? (
                        comments.map((comment) => (
                            <Message key={comment.id}>
                                <MessageAvatar>
                                    <Avatar className="size-11 border-black/30 bg-muted">
                                        <AvatarFallback className="font-semibold text-primary">
                                            {comment?.user ? (
                                                getInitials(comment?.user.name)
                                            ) : (
                                                <UserRound className="size-5" />
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                </MessageAvatar>
                                <MessageContent>
                                    <MessageHeader className="flex items-center gap-2 text-sm">
                                        {comment.user?.name ?? "-"}
                                        {comment.user?.position && (
                                            <Badge
                                                className="text-xs rounded-sm"
                                                variant="secondary"
                                            >
                                                {comment.user?.position}
                                            </Badge>
                                        )}
                                    </MessageHeader>
                                    <Bubble
                                        variant={
                                            comment?.is_own
                                                ? "default"
                                                : "muted"
                                        }
                                    >
                                        <BubbleContent>
                                            {comment.content}
                                        </BubbleContent>
                                    </Bubble>
                                </MessageContent>
                            </Message>
                        ))
                    ) : (
                        <Empty>
                            <EmptyHeader>
                                <EmptyDescription>
                                    Belum ada komentar.
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    )}
                </div>
                {can("comment.create") && (
                    <form onSubmit={handleSubmit}>
                        <Field data-invalid={Boolean(errors.content)}>
                            <InputGroup>
                                <InputGroupTextarea
                                    value={data.content}
                                    onChange={(
                                        e: React.ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                            | HTMLSelectElement
                                        >,
                                    ) =>
                                        setData({
                                            ...data,
                                            content: e.target.value,
                                        })
                                    }
                                    aria-invalid={Boolean(errors.content)}
                                    placeholder="Tulis komentar..."
                                />
                                <InputGroupAddon align="block-end">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-sm border">
                                            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                                                {auth.user ? (
                                                    getInitials(auth.user.name)
                                                ) : (
                                                    <UserRound className="size-5" />
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <FieldDescription>
                                            {auth.user.name ?? "-"}{" "}
                                            {auth.user.position && (
                                                <Badge
                                                    className="text-xs rounded-sm"
                                                    variant="secondary"
                                                >
                                                    {auth.user.position}
                                                </Badge>
                                            )}
                                        </FieldDescription>
                                    </div>
                                    <InputGroupButton
                                        disabled={
                                            processing ||
                                            data.content.length < 1
                                        }
                                        variant="default"
                                        size="sm"
                                        className="ml-auto"
                                        type="submit"
                                    >
                                        {processing ? <Spinner /> : <Send />}
                                        Kirim Komentar
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
