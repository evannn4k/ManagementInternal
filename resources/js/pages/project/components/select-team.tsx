import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { UserWithRole } from "@/types/data/user";
import { useState } from "react";

export function SelectTeam({
    users,
    className,
    team,
    setTeam,
}: {
    users: UserWithRole[];
    className?: string;
    team: any;
    setTeam: any;
}) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                className={className}
                type="button"
                variant="outline"
                onClick={() => setOpen(true)}
            >
                Pilih Team
            </Button>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger />
                <PopoverContent
                    align="center"
                    className="p-0 bg-transparent border-none"
                >
                    <Command className="rounded-lg border">
                        <CommandInput placeholder="Pilih nama atau posisi" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="User">
                                {users.map((user: UserWithRole) => (
                                    <CommandItem
                                        key={user.id}
                                        value={user.name}
                                        onSelect={() => {
                                            setOpen(false);
                                            setTeam((prev: any[]) => {
                                                const currentTeam = prev || [];
                                                if (
                                                    currentTeam.some(
                                                        (item: UserWithRole) =>
                                                            item.id === user.id,
                                                    )
                                                ) {
                                                    return currentTeam;
                                                }
                                                return [...currentTeam, user];
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
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}
