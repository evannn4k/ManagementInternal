import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Download, RotateCcw, Search } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Filter } from "@/components/filter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import FormField from "@/components/form-field";

export function ActivityToolbar({
    url,
    query,
    isProjectDetail = false,
    updateQuery,
}: {
    url: string;
    query: Record<string, any> | undefined;
    isProjectDetail?: boolean;
    updateQuery: (params: Record<string, any>) => void;
}) {
    const [search, setSearch] = useState("");

    const typeFilter = {
        placeholder: "Semua Type",
        key: "type",
        options: ["create", "update", "delete"],
    };

    const priorityFilter = {
        placeholder: "Semua Tabel",
        key: "table",
        options: ["task", "project", "user", "status"],
    };

    const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        updateQuery({ [id]: value });
    };

    const dateFrom = query?.date_from ?? "";
    const dateTo = query?.date_to ?? "";

    return (
        <Card className="bg-muted/50 py-2">
            <CardContent className="px-2 flex justify-between flex-col md:flex-row gap-2">
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
                                placeholder="Cari pengguna..."
                            />
                            <InputGroupAddon className="cursor-pointer">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </form>
                    <div className="flex gap-2">
                        <Filter updateQuery={updateQuery} data={typeFilter} />
                        {!isProjectDetail && (
                            <Filter
                                updateQuery={updateQuery}
                                data={priorityFilter}
                            />
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <CalendarDays /> Rentan Tanggal
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="rounded-2xl">
                            <PopoverHeader>
                                <PopoverTitle>
                                    Rentang tanggal aktivitas
                                </PopoverTitle>
                            </PopoverHeader>
                            <div className="flex flex-col gap-2 pt-2">
                                <FormField
                                    label="Dari"
                                    name="date_from"
                                    onChange={handleDateFilterChange}
                                    value={dateFrom ?? ""}
                                    type="date"
                                    max={dateTo}
                                />
                                <FormField
                                    label="Sampai"
                                    name="date_to"
                                    onChange={handleDateFilterChange}
                                    value={dateTo ?? ""}
                                    type="date"
                                    min={dateFrom}
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button variant="outline" asChild>
                        <Link href={url}>
                            <RotateCcw /> Reset
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
