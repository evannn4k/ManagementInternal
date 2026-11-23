import { ProjectType } from "@/types/data/project";
import ProjectDetailLayout from "./project-detail-layout";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronDown, CircleCheck, Plus, RefreshCwOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SprintForm from "./components/sprint-form";
import { useModal } from "@/hooks/use-modal";

export default function ProjectDetailSprint({
    project,
}: {
    project: ProjectType;
}) {
    const modal = useModal();
    return (
        <>
            <SprintForm project={project} modal={modal} />
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle>Daftar Sprint Proyek</CardTitle>
                    <CardDescription>
                        Setiap sprint menggunakan struktur kolom status milik
                        proyek yang sama.
                    </CardDescription>
                    <CardAction>
                        <Button size="sm" onClick={() => modal.openCreate()}>
                            <Plus /> Tambah Sprint
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Collapsible>
                        <Card className="p-0 bg-muted/50 !gap-0">
                            <CollapsibleTrigger className="group" asChild>
                                <CardHeader className="p-4 flex justify-between items-center gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <Badge>Aktif</Badge>
                                            <CardTitle>Sprint 1 : </CardTitle>
                                        </div>
                                        <CardDescription className="max-w-4/5 text-xs line-clamp-1 group-data-[state=open]:line-clamp-none">
                                            Lorem ipsum dolor sit amet
                                            consectetur, adipisicing elit.
                                            Voluptate eaque expedita reiciendis
                                            omnis magni asperiores est, fugiat
                                            quod deleniti officia, sit
                                            voluptatum. Delectus sint culpa
                                            deleniti fugit natus tenetur ex!
                                        </CardDescription>
                                    </div>
                                    <div>
                                        <ChevronDown className="transition duration-300 ease-in-out group-data-[state=open]:rotate-180 size-5" />
                                    </div>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <Table className="border-t">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <CircleCheck className="size-4" />
                                            </TableCell>
                                            <TableCell className="w-full">
                                                Authentikasi
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    Completed
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                Keluarkan
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>
                    {/*<Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <RefreshCwOff />{" "}
                        </EmptyMedia>
                        <EmptyTitle>Belum Ada Sprint</EmptyTitle>
                        <EmptyDescription>
                            Tambahkan sprint pada project ini sekarang.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent className="flex-row justify-center gap-2">
                        <Button size="sm" onClick={() => modal.openCreate()}>
                            <Plus /> Tambah Sprint
                        </Button>
                    </EmptyContent>
                </Empty>*/}
                </CardContent>
            </Card>
        </>
    );
}

ProjectDetailSprint.layout = (page: any) => {
    const project = page.project ?? page.props.project;

    return <ProjectDetailLayout project={project}>{page}</ProjectDetailLayout>;
};
