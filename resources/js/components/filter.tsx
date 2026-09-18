import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function Filter({
    data,
    updateQuery,
}: {
    data: { placeholder: string; key: string; options: string[] };
    updateQuery: (params: Record<string, any>) => void;
}) {
    return (
        <Select onValueChange={(value) => updateQuery({ [data.key]: value })}>
            <SelectTrigger className="">
                <SelectValue placeholder={data.placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="">{data.placeholder}</SelectItem>
                    {data.options.map((option: string) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
