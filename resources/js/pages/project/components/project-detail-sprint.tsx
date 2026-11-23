import { CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectDetailSprint({
    updateQuery,
}: {
    updateQuery: (params: Record<string, any>) => void;
}) {
    const handleChangeBoard = (val: string) => {
        updateQuery({ sprint: val });
    };

    return (
        <CardContent className="p-4 border-t border-b bg-muted/50">
            <div className="flex items-center gap-2">
                <CardTitle>Tampilan Board : </CardTitle>
                <Tabs onValueChange={handleChangeBoard}>
                    <TabsList className="bg-transparent">
                        <TabsTrigger value="">Semua Task</TabsTrigger>
                        <TabsTrigger value="sprint-1">sprint 1</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </CardContent>
    );
}
