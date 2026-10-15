import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { UserWithRole } from "@/types/data/user";
import { useState } from "react";
import { Plus } from "lucide-react";

export function SelectTeam({
    users,
    className,
    setTeam,
    error,
}: {
    users: UserWithRole[];
    className?: string;
    setTeam: any;
    error: boolean;
}) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                aria-invalid={error}
                className={className}
                type="button"
                variant="outline"
                onClick={() => setOpen(true)}
            >
                <Plus /> Tambah
            </Button>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger />
                <PopoverContent
                    align="end"
                    className="p-0 bg-transparent border-none"
                >
                    <Command className="rounded-lg border">
                        <CommandInput placeholder="Pilih nama atau posisi" />
                        <CommandList>
                            <CommandEmpty>Tidak ada data.</CommandEmpty>
                            {users && users.length > 0 && (
                                <CommandGroup heading="User">
                                    {users.map((user: UserWithRole) => (
                                        <CommandItem
                                            key={user.id}
                                            value={user.name}
                                            onSelect={() => {
                                                setOpen(false);
                                                setTeam((prev: any[]) => {
                                                    const currentTeam =
                                                        prev || [];
                                                    if (
                                                        currentTeam.some(
                                                            (
                                                                item: UserWithRole,
                                                            ) =>
                                                                item.id ===
                                                                user.id,
                                                        )
                                                    ) {
                                                        return currentTeam;
                                                    }
                                                    return [
                                                        ...currentTeam,
                                                        user,
                                                    ];
                                                });
                                            }}
                                        >
                                            {user.name}{" "}
                                            {user.position
                                                ? " - " + user.position
                                                : ""}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}
