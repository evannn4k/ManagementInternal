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
import { router } from "@inertiajs/react";
import { Role } from "@/types/data/role";

export function UserToolbar({
    url,
    updateQuery,
    roles,
}: {
    url: string;
    updateQuery: (params: Record<string, any>) => void;
    roles: Role[];
}) {
    const [search, setSearch] = useState("");

    const roleFilter = {
        placeholder: "Semua Role",
        key: "role",
        options: roles.map((role) => role.name),
    };

    const statusFilter = {
        placeholder: "Semua Status",
        key: "is_active",
        options: ["aktif", "nonaktif"],
    };

    const handleReset = () => {
        router.get(url, {}, { preserveScroll: true });
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
                                data={roleFilter}
                            />
                            <Filter
                                updateQuery={updateQuery}
                                data={statusFilter}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleReset}>
                                <RotateCcw /> Reset
                        </Button>
                        <Button variant="outline">
                            <Download /> Export CSV
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
