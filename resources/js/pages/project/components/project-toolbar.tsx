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

export function ProjectToolbar({
    url,
    updateQuery,
}: {
    url: string;
    updateQuery: (params: Record<string, any>) => void;
}) {
    const [search, setSearch] = useState("");

    const priorityFilter = {
        placeholder: "Semua Prioritas",
        key: "priority",
        options: ["high", "medium", "low"],
    };

    const statusFilter = {
        placeholder: "Semua Status",
        key: "is_active",
        options: ["aktif", "nonaktif"],
    };

    return (
        <>
            <Card className="bg-muted/50 p-2">
                <CardContent className="p-0 flex justify-between flex-col md:flex-row gap-2">
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
                                data={statusFilter}
                            />
                            <Filter
                                updateQuery={updateQuery}
                                data={priorityFilter}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={url}>
                                <RotateCcw /> Reset
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
