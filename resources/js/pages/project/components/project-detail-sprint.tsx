import { CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePage } from "@inertiajs/react";

export function ProjectDetailSprint({
    updateQuery,
    sprintsList,
}: {
    updateQuery: (params: Record<string, any>) => void;
    sprintsList: SprintListType[];
}) {
    const handleChangeBoard = (val: string) => {
        updateQuery({ sprint: val });
    };

    const { query } = usePage().props;

    return (
        <CardContent className="p-4 border-t border-b bg-muted/50">
            <div className="flex items-center gap-2">
                <CardTitle>Tampilan Board : </CardTitle>
                <Tabs
                    defaultValue={query.sprint ?? ""}
                    onValueChange={handleChangeBoard}
                >
                    <TabsList className="bg-transparent">
                        <TabsTrigger value="">Semua Task</TabsTrigger>
                        {sprintsList.map((sprint) => (
                            <TabsTrigger key={sprint.id} value={sprint.id}>
                                Sprint {sprint.number}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </CardContent>
    );
}
