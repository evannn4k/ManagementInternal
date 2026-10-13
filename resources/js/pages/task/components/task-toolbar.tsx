import { Card, CardContent } from "@/components/ui/card";
import { Download, RotateCcw, Search } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Filter } from "@/components/filter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TaskToolbar({
    url,
    updateQuery,
    projects,
}: {
    url: string;
    updateQuery: (params: Record<string, any>) => void;
    projects: any[];
}) {
    const [search, setSearch] = useState("");

    const priorityFilter = {
        placeholder: "Semua Prioritas",
        key: "priority",
        options: ["urgent", "high", "medium", "low"],
    };

    const projectFilter = {
        placeholder: "Semua Proyek",
        key: "project",
        options: projects.map((p) => p.name),
    };

    return (
        <>
            <CardContent className="flex justify-between flex-col md:flex-row gap-2">
                <div className="flex flex-col md:flex-row gap-2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateQuery({ search: search });
                        }}
                    >
                        <InputGroup className="max-w-xs bg-card">
                            <InputGroupInput
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                            />
                            <InputGroupAddon className="cursor-pointer">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </form>
                    <div className="flex gap-2">
                        <Filter
                            updateQuery={updateQuery}
                            data={projectFilter}
                        />
                        <Filter
                            updateQuery={updateQuery}
                            data={priorityFilter}
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="my-task">Tugas Saya Saja</Label>
                        <Switch
                            id="my-task"
                            onCheckedChange={(val: boolean) =>
                                updateQuery({
                                    task_view: val ? "own" : "all",
                                })
                            }
                        />
                    </div>

                    <Button variant="outline" asChild>
                        <Link href={url}>
                            <RotateCcw /> Reset
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </>
    );
}
