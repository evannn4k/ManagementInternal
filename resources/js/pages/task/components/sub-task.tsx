import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { TaskType } from "@/types/data/task";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import { useRef } from "react";
import { router, useForm } from "@inertiajs/react";
import subTask from "@/routes/task/sub-task";
import { toast } from "sonner";

export function SubTask({ task }: { task: TaskType }) {
    const focusInput = useRef<HTMLInputElement>(null);

    const { post, processing, data, setData, reset } = useForm({
        name: "",
    });

    const totalSubTask = task.sub_tasks.length ?? 0;
    const totalCompletedSubTask =
        task.sub_tasks.filter((task) => task.is_completed == true).length ?? 0;

    const taskCompletionPrecentage =
        totalSubTask > 0
            ? Math.round((totalCompletedSubTask / totalSubTask) * 100)
            : 0;

    const handleSubmitNewTask = (e: React.FormEvent) => {
        e.preventDefault();

        post(subTask.create(task.id).url, {
            onSuccess: () => {
                reset();
            },
            onError: (error) => {
                if (error.name) {
                    toast.error(error.name);
                }
            },
        });
    };

    const handleFocusInput = () => {
        focusInput.current?.focus();
    };

    const handleDeleteSubTask = (id: string) => {
        router.delete(subTask.delete(id), {
            preserveScroll: true,
        });
    };

    const handleChakedChange = (val: boolean, id: string) => {
        router.patch(
            subTask.delete(id),
            { status: val },
            {
                preserveScroll: true,
                onError: () => {
                    toast.error("Gagal mengganti status subtugas.");
                },
            },
        );
    };

    return (
        <Card className="bg-muted/50">
            <CardHeader className="flex flex-col gap-2">
                <div className="w-full flex justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle>Sub Task</CardTitle>
                        <Badge variant="secondary">
                            {totalCompletedSubTask} dari {totalSubTask} selesai
                        </Badge>
                    </div>
                    <CardDescription>
                        {taskCompletionPrecentage}%
                    </CardDescription>
                </div>
                <Progress value={taskCompletionPrecentage} className="h-1.5" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    {task.sub_tasks.length > 0 ? (
                        task.sub_tasks.map((sub_task) => (
                            <FieldLabel key={sub_task.id}>
                                <Field
                                    className="!py-2 !px-3 !items-center"
                                    orientation="horizontal"
                                >
                                    <Checkbox
                                        onCheckedChange={(val) =>
                                            handleChakedChange(val, sub_task.id)
                                        }
                                    />
                                    <FieldContent>
                                        <FieldTitle>{sub_task.name}</FieldTitle>
                                    </FieldContent>
                                    <Button
                                        size="icon-xs"
                                        variant="destructive"
                                        onClick={() =>
                                            handleDeleteSubTask(sub_task.id)
                                        }
                                    >
                                        <Trash />
                                    </Button>
                                </Field>
                            </FieldLabel>
                        ))
                    ) : (
                        <Empty>
                            <EmptyHeader className="leading-2">
                                <EmptyTitle>Belum ada Sub-Task</EmptyTitle>
                                <EmptyDescription>
                                    Silahkan tambahkan sub-task baru dengan
                                    mengisi input dibawah
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Button onClick={handleFocusInput} size="sm">
                                    <Plus /> Buat Sub-Task
                                </Button>
                            </EmptyContent>
                        </Empty>
                    )}
                </div>
                <form onSubmit={handleSubmitNewTask}>
                    <InputGroup>
                        <InputGroupInput
                            value={data.name}
                            onChange={(e) => setData({ name: e.target.value })}
                            ref={focusInput}
                            placeholder="Tambah sub-task baru..."
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton
                                type="submit"
                                variant="secondary"
                                disabled={processing}
                            >
                                {processing ? <>Menambah...</> : <>Tambah</>}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </form>
            </CardContent>
        </Card>
    );
}
